'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function OrderSummary({ items, shippingInfo, onTotalCalculated }) {
  const calculateSubtotal = () => {
    return items.reduce((total, item) => 
      total + (item.product.price.amount * item.quantity), 0
    );
  };

  console.log('Shipping Info:', shippingInfo);

  const calculateShipping = () => {
    // Example shipping calculation logic
    return items.length > 0 ? 50 : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  // Pass total to parent whenever it changes
  useEffect(() => {
    const total = calculateTotal();
    onTotalCalculated(total);
  }, [items, onTotalCalculated]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      {/* Product Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image 
                src={item.product.images[0]} 
                alt={item.product.name} 
                width={64} 
                height={64} 
                className="rounded-md"
              />
              <div>
                <p className="font-semibold">{item.product.name}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">
              ₹{(item.product.price.amount * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-semibold">₹{calculateSubtotal().toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-600">Shipping</p>
          <p className="font-semibold">₹{calculateShipping().toFixed(2)}</p>
        </div>
        <div className="flex justify-between border-t pt-4">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">₹{calculateTotal().toFixed(2)}</p>
        </div>
      </div>

      {/* Shipping Information */}
      {shippingInfo && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-bold mb-2">Shipping Information</h3>
          <p>{shippingInfo.fullName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.pincode}</p>
          <p>{shippingInfo.country}</p>
          <p>Phone: {shippingInfo.phone}</p>
        </div>
      )}
    </div>
  );
}
