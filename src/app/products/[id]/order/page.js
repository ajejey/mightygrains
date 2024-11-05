'use client';
import Script from 'next/script';
import React, { useState } from 'react'

const OrderPage = () => {
  const [amount, setAmount] = useState(0);

  const createOrder = async () => {
    const response = await fetch('/api/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    console.log(data);

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
      order_id: data.id,
      handler: async function (response) {
        // verify payment
        const res = await fetch('/api/verifyOrder', {
          method: 'POST',
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          })
        })
        const data = await res.json();
        console.log("data", data);

        if (data.isOk) {
          // do whatever page transition you want as payment is complete
          alert('Payment verified successfully');
        } else {
          alert('Payment verification failed');
        }
      }
    }

    const payment = new window.Razorpay(paymentData);
    payment.open();
  }
  
  return (
    <div className='flex flex-col items-center my-12'>
      <Script type='text/javascript' src="https://checkout.razorpay.com/v1/checkout.js" />
      <h2>Order</h2>
      <input
        type="number"
        placeholder='Enter Amount'
        className='border-2 border-black rounded-md p-2 mb-4'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded'
        onClick={createOrder}
      >
        Create Order
      </button>
    </div>
  )
}

export default OrderPage