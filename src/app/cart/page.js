'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

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

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                
                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="font-medium text-green-800">{item.product.name}</h3>
                  <p className="text-amber-600">₹{item.product.price.amount} per {item.product.price.unit}</p>
                </div>

                {/* Quantity Controls and Price */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>

                  {/* Price and Remove Button */}
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 w-full sm:w-auto">
                    <div className="font-medium text-green-800">₹{item.product.price.amount * item.quantity}</div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-green-800 mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-amber-700">
              <span>Subtotal</span>
              <span>₹{cart.items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between text-amber-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-green-800">
              <span>Total</span>
              <span>₹{cart.items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0)}</span>
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
