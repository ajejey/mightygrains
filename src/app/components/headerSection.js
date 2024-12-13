'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { account } from '@/appwrite/clientConfig';

const CartPreview = () => {
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/cart" className="flex items-center space-x-1">
        <FaShoppingCart className="text-2xl" />
        {cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.items.length}
          </span>
        )}
      </Link>

      {/* Cart Preview Popup */}
      {isHovered && cart.items.length > 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 p-4">
          <div className="max-h-64 overflow-y-auto">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-medium">₹{cart.total}</span>
            </div>
            <Link 
              href="/cart" 
              className="w-full bg-green-500 text-white py-2 rounded-lg text-center block hover:bg-green-600 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderSection = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <header className="w-full bg-amber-50 text-green-800 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl uppercase tracking-wide">
              <span className='text-green-800 font-bold'>Mighty</span>
              <span className="text-green-800">Grains</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link href="/products" className="text-green-700 hover:text-green-600 transition-colors">Products</Link>
              
                <Link href="/orders" className="text-green-700 hover:text-green-600 flex items-center">
                   Orders
                </Link>
              
              <Link href="/about" className="text-green-700 hover:text-green-600 transition-colors">About Us</Link>
              <Link href="/contact" className="text-green-700 hover:text-green-600 transition-colors">Contact</Link>
            </nav>
            <CartPreview />
          </div>

          <button 
            className="md:hidden text-green-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <Link href="/products" className="block py-2 text-green-700 hover:text-green-600 transition-colors">Products</Link>
            
              <Link href="/orders" className="block py-2 text-green-700 hover:text-green-600 flex items-center">
                 Orders
              </Link>
            
            <Link href="/about" className="block py-2 text-green-700 hover:text-green-600 transition-colors">About Us</Link>
            <Link href="/contact" className="block py-2 text-green-700 hover:text-green-600 transition-colors">Contact</Link>
            <div className="py-2">
              <CartPreview />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;