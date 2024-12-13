'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PaymentMethod({ 
  onPaymentMethodChange, 
  onPayNow, 
  totalAmount 
}) {
  const [selectedMethod, setSelectedMethod] = useState('razorpay');

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: 'https://badges.razorpay.com/badge-light.png'
    },
    
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentMethodChange(method);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodChange(method.id)}
            className={`
              flex flex-col items-center justify-center 
              p-4 border-2 rounded-lg transition-all
              ${selectedMethod === method.id 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'}
            `}
          >
            <Image 
              src={method.icon} 
              alt={method.name} 
              width={72} 
              height={72} 
              className="mb-2"
            />
            <span className="text-sm font-medium">{method.name}</span>
          </button>
        ))}
      </div>

      {/* Total Amount */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Amount</span>
          <span className="text-2xl font-bold text-green-600">
            ₹{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Pay Now Button */}
      <button
        onClick={onPayNow}
        className="w-full bg-green-600 text-white py-3 rounded-lg 
        hover:bg-green-700 transition-colors font-semibold text-lg"
      >
        Pay Now
      </button>

      {/* Payment Security Note */}
      <div className="text-center text-xs text-gray-500 mt-4">
        <p>🔒 Secure payment powered by Razorpay</p>
      </div>
    </div>
  );
}
