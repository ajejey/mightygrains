'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaTrash, FaTruck } from 'react-icons/fa';
import { calculateDeliveryFee } from './actions';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [pincode, setPincode] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [lastValidPincode, setLastValidPincode] = useState('');
  const [deliveryFeeMessage, setDeliveryFeeMessage] = useState('');
  const [pincodeError, setPincodeError] = useState('');

  const productsTotalAmount = cart.items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0)

  // Determine if pincode input should be shown and delivery fee calculated
  const shouldShowPincodeInput = productsTotalAmount < 499;

  // Effect to dynamically update delivery fee based on total amount
  useEffect(() => {
    const updateDeliveryFee = async () => {
      // If total is 499 or more, set delivery fee to 0
      if (productsTotalAmount >= 499) {
        setDeliveryFee(0);
        setDeliveryFeeMessage('Free Delivery!');
        return;
      }

      // If we have a previously validated pincode, recalculate
      if (lastValidPincode) {
        try {
          const result = await calculateDeliveryFee(lastValidPincode, productsTotalAmount);
          
          if (result.success) {
            setDeliveryFee(result.deliveryFee);
            setDeliveryFeeMessage(result.message);
          } else {
            // Fallback to default fee if validation fails
            setDeliveryFee(50);
            setDeliveryFeeMessage('Default delivery fee applied');
          }
        } catch (error) {
          console.error('Delivery fee recalculation error:', error);
          setDeliveryFee(50);
          setDeliveryFeeMessage('Error recalculating delivery fee');
        }
      } else {
        // No pincode entered, use default fee
        setDeliveryFee(50);
        setDeliveryFeeMessage('');
      }
    };

    updateDeliveryFee();
  }, [productsTotalAmount, lastValidPincode]);

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    
    // Basic pincode validation
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }

    try {
      const result = await calculateDeliveryFee(pincode, productsTotalAmount);
      
      if (result.success) {
        setDeliveryFee(result.deliveryFee);
        setDeliveryFeeMessage(result.message);
        setPincodeError('');
        // Store the last valid pincode
        setLastValidPincode(pincode);
      } else {
        setDeliveryFee(result.deliveryFee);
        setDeliveryFeeMessage(result.message);
        setPincodeError('Unable to validate pincode');
      }
    } catch (error) {
      console.error('Delivery fee calculation error:', error);
      setDeliveryFeeMessage('Error calculating delivery fee');
    }
  };

  console.log("cart in cart page ", cart);

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Your Cart is Empty</h1>
        <p className="text-amber-700 mb-8">Add some delicious items to your cart!</p>
        <Link 
          href="/products" 
          className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>

      
      <div className="relative bg-gradient-to-r from-green-100 to-green-200 border-l-4 border-green-600 shadow-md rounded-lg px-6 py-3 mb-8 overflow-hidden">
      <div className="flex items-center justify-center space-x-3">
        <FaTruck className="text-green-700 w-6 h-6" strokeWidth={2} />
        <p className="text-green-900 font-medium text-base tracking-tight">
          Free Shipping on Orders Over <span className="font-bold">₹499</span>
        </p>
      </div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-300/50 rounded-full blur-sm"></div>
    </div>
    

      <div className="grid md:grid-cols-3 gap-4 md:gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-md p-3 md:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-green-800 text-sm md:text-base truncate">{item.product.name}</h3>
                  <p className="text-amber-600 text-sm">₹{item.product.price.amount} per {item.product.price.unit}</p>
                </div>

                {/* Quantity Controls and Price */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-2 mt-2 sm:mt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="px-2 md:px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-2 md:px-3 py-1 border-x text-sm md:text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 md:px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>

                  {/* Price and Remove Button */}
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-green-800 text-sm md:text-base">₹{item.product.price.amount * item.quantity}</div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit">
          <h2 className="text-xl font-bold text-green-800 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-amber-700">
              <span>Subtotal</span>
              <span>₹{productsTotalAmount}</span>
            </div>
            {shouldShowPincodeInput && (
              <div className="mb-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-md font-semibold mb-2">Pincode for Delivery Fee</p>
                <form onSubmit={handlePincodeSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <input 
                    type="text" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter Pincode" 
                    className={`border rounded-md px-3 py-2 w-full sm:w-auto ${
                      pincodeError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength="6"
                  />
                  <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Check
                  </button>
                </form>
                {pincodeError && (
                  <p className="text-red-500 mt-2 text-sm">{pincodeError}</p>
                )}
                {deliveryFeeMessage && (
                  <p className={`mt-2 text-sm ${
                    deliveryFee === 0 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {deliveryFeeMessage}
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-between text-amber-700">
              <span>Shipping</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-green-800">
              <div className="flex flex-col">
                <span>Total</span>
                <span className="text-xs font-normal text-gray-600">
                  Inclusive of all taxes and delivery fees
                </span>
              </div>
              <span>₹{productsTotalAmount + deliveryFee}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-amber-500 text-white text-center py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
