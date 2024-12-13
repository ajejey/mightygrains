'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/appwrite/clientConfig';
import { useCart } from '@/context/CartContext';
import { createShippingInfo, getExistingShippingInfo } from './actions';

const ShippingInfoPage = () => {
  const router = useRouter();
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [existingOrderId, setExistingOrderId] = useState(null);

  useEffect(() => {
    const fetchExistingShippingInfo = async () => {
      try {
        // Get current user
        const user = await account.get();

        // Fetch existing shipping info
        const existingInfo = await getExistingShippingInfo(user.$id);

        if (existingInfo) {
          setFormData({
            fullName: existingInfo.fullName,
            address: existingInfo.address,
            city: existingInfo.city,
            state: existingInfo.state,
            pincode: existingInfo.pincode,
            phone: existingInfo.phone
          });
          setExistingOrderId(existingInfo.orderId);
        }
      } catch (error) {
        console.error('Error fetching existing shipping info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExistingShippingInfo();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get current user
      const user = await account.get();

      // Create or update shipping info 
      const result = await createShippingInfo({
        ...formData,
        userId: user.$id,
        email: user.email,
        existingOrderId: existingOrderId
      });

      // Redirect to payment
      router.push('/checkout/payment');
    } catch (error) {
      console.error('Shipping info error:', error);
      setError('Failed to save shipping information. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Shipping Information</h1>
      
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="font-semibold text-green-800 mb-2">Order Summary</h2>
        <div className="space-y-2">
          {cart.items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>{item.product.name} x {item.quantity}</span>
              <span>₹{item.product.price.amount * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{cart.items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Info Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              pattern="[0-9]{6}"
              title="Pincode must be 6 digits"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              pattern="[0-9]{10}"
              title="Phone number must be 10 digits"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Continue to Payment'}
        </button>
      </form>
    </div>
  );
};

export default ShippingInfoPage;