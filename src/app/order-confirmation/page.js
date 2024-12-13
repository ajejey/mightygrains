'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { getLatestUserOrder } from '../payment/actions';
import { account } from '@/appwrite/clientConfig';
// import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const session = await account.get();
        // console.log("SESSION IN ORDER CONFIRMATION", session);
        const latestOrder = await getLatestUserOrder(session.$id);
        setOrderDetails(latestOrder);
      } catch (error) {
        console.error('Error fetching order details:', error);
        // router.push('/');
      }
    };

    fetchLatestOrder();
  }, []);

  if (!orderDetails) {
    // return <LoadingSpinner />;
    return <div>Loading...</div>;
  }

  // console.log("ORDER CONFIRMATION ORDER DETAILS ", orderDetails);

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Spam Folder Alert */}
      <div className="bg-sky-50 border-l-4 border-sky-400 p-4 mb-6 rounded-md" role="alert">
        <p className="font-bold text-sky-700">📧 Check Your Email (Including Spam Folder)</p>
        <p className="text-sky-600">
          We&apos;ve sent your order confirmation to your email. 
          If you can&apos;t find it in your inbox, please check your spam or junk folder.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Order Number</p>
              <p className="font-medium">{orderDetails._id.slice(-8)}</p>
            </div>
            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-medium text-green-600">
                ₹{orderDetails.total.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-medium">
                {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Payment Method</p>
              <p className="font-medium text-green-600 capitalize">
                {orderDetails.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="text-left">
            <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>
            <p>{orderDetails.shippingAddress.address}</p>
            <p>
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
            </p>
            <p>{orderDetails.shippingAddress.country}</p>
            <p>Phone: {orderDetails.shippingAddress.phoneNumber}</p>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {orderDetails.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2 last:border-b-0">
              <div>
                <p className="font-medium">{item.productId}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Link 
            href="/orders" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Orders
          </Link>
          <Link 
            href="/" 
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
