'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import { getLatestUserOrder } from '../payment/actions';
import { account } from '@/appwrite/clientConfig';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState(null);
  const searchParams = useSearchParams();
  const hasEmailIssue = searchParams.get('email') === 'failed';

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const session = await account.get();
        const latestOrder = await getLatestUserOrder(session.$id);
        setOrderDetails(latestOrder);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed and will be processed shortly.
        </p>

        {/* Email Alert - Only show if there was an email issue */}
        {hasEmailIssue ? (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-md text-left" role="alert">
            <p className="font-bold text-amber-700">Haven&apos;t received your confirmation email?</p>
            <p className="text-amber-600">
              Don&apos;t worry! Your order is confirmed and being processed. If you need your order details, please contact us at{' '}
              <a href="mailto:support@mightygrains.com" className="underline">
                support@mightygrains.com
              </a>
            </p>
          </div>
        ) : (
          <div className="bg-sky-50 border-l-4 border-sky-400 p-4 mb-6 rounded-md text-left" role="alert">
            <p className="font-bold text-sky-700">📧 Check Your Email</p>
            <p className="text-sky-600">
              We&apos;ve sent your order confirmation to your email. 
              If you can&apos;t find it in your inbox, please check your spam folder.
            </p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Order Number</p>
              <p className="font-medium">{orderDetails._id}</p>
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
                {new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Estimated Delivery</p>
              <p className="font-medium">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
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

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
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
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            View All Orders
          </Link>
          <Link 
            href="/products" 
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
