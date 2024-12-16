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

  const calculateShippingCost = () => {
    const cartTotal = calculateSubtotal();
    // If cart total is 499 or more, free shipping
    if (cartTotal >= 499) {
      return 0;
    }

    // If within Bangalore, lower shipping cost
    if (shippingInfo?.withInBangalore) {
      return 30;
    }

    // Default outstation shipping cost
    return 50;
  };

  const shippingCost = calculateShippingCost();
  const totalAmount = calculateSubtotal() + shippingCost;

  // Pass total to parent whenever it changes
  useEffect(() => {
    onTotalCalculated(totalAmount);
  }, [items, onTotalCalculated, shippingInfo]);

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
          <p className="text-gray-600">
            Shipping 
            {shippingCost === 0 && <span className="text-green-600 ml-2">(Free)</span>}
            {shippingInfo?.withInBangalore && shippingCost > 0 && 
              <span className="text-sm text-gray-600 ml-2">(Local Delivery)</span>}
          </p>
          <p className="font-semibold">₹{shippingCost.toFixed(2)}</p>
        </div>
        <div className="flex justify-between border-t pt-4">
          <div className="flex flex-col">
            <p className="text-lg font-bold">Total</p>
            <p className="text-xs text-gray-600 font-normal">
              Inclusive of all taxes and shipping
            </p>
          </div>
          <p className="text-lg font-bold">₹{totalAmount.toFixed(2)}</p>
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
