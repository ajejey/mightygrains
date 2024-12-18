'use client';
import Script from 'next/script';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { account } from '@/appwrite/clientConfig';

const OrderPage = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = params;

  const createOrder = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const user = await account.get();
      if (!user) {
        router.push('/login');
        return;
      }

      // Get cart data
      const cart = await fetch('/api/cart').then(res => res.json());
      if (!cart || !cart.items || cart.items.length === 0) {
        alert('Your cart is empty');
        return;
      }

      // Create order
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cart.total,
          items: cart.items,
          userId: user.$id,
          shippingAddress: {
            address: 'Test Address',
            city: 'Test City',
            state: 'Test State',
            pincode: '123456'
          }
        }),
      });
      
      const data = await response.json();
      if (!data.id) throw new Error('Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Mighty Grains",
        description: "Payment for your order",
        order_id: data.id,
        handler: async function (response) {
          try {
            const res = await fetch('/api/verifyOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                userId: user.$id
              })
            });
            
            const data = await res.json();
            if (data.isOk) {
              alert('Payment successful!');
              router.push('/orders');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='flex flex-col items-center my-12'>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <button
        className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
        onClick={createOrder}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default OrderPage;