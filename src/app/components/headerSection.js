'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { account } from '@/appwrite/clientConfig';
import { useRouter } from 'next/navigation';

const CartPreview = () => {
  const { cart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const cartPreviewRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartPreviewRef.current &&
        !cartPreviewRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={cartPreviewRef}
      onMouseEnter={() => setIsHovered(true)}
    >
      <Link
        href="/cart"
        className="flex items-center space-x-1 relative"
        onClick={() => setIsHovered(false)}
      >
        <FaShoppingCart className="text-2xl" />
        {cart.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {cart.items.length}
          </span>
        )}
      </Link>

      {/* Cart Preview Popup */}
      {isHovered && cart.items.length > 0 && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 p-4"
          onMouseLeave={() => setIsHovered(false)}
        >
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
                  <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-medium">₹{(item.product.price.amount * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-medium">₹{cart.total.toFixed(2)}</span>
            </div>
            <Link
              href="/cart"
              className="w-full bg-green-500 text-white py-2 rounded-lg text-center block hover:bg-green-600 transition-colors"
              onClick={() => setIsHovered(false)}
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
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const checkUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error('User session error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      setIsLoggedIn(false);
      setIsMenuOpen(false); // Close menu after logout
      router.push('/'); // Redirect to home page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={`w-full bg-amber-50 text-green-800 fixed top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''
        }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl uppercase tracking-wide">
                <span className='text-green-800 font-bold'>Mighty</span>
                <span className="text-green-800">Grains</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8">
                <Link href="/products" className="text-green-700 hover:text-green-600 transition-colors">Products</Link>
                <Link href="/orders" className="text-green-700 hover:text-green-600 flex items-center">
                  Orders
                </Link>
                <Link href="/about" className="text-green-700 hover:text-green-600 transition-colors">About Us</Link>
                <Link href="/contact" className="text-green-700 hover:text-green-600 transition-colors">Contact</Link>
              </nav>
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogout}
                    className="text-green-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/orders" className="text-green-700 hover:text-green-600">
                  Login
                </Link>
              )}
              <CartPreview />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3 sm:space-x-4">
              <CartPreview />
              <button
                className="text-green-700 focus:outline-none p-1.5 z-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMenu}
          style={{ top: 0 }}
        />
      )}

      {/* Mobile Sliding Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-amber-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-200">
            <span className="text-xl font-bold text-green-800">Menu</span>
            <button
              onClick={closeMenu}
              className="text-green-700 hover:text-green-900 focus:outline-none p-2"
              aria-label="Close menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <Link
              href="/products"
              className="block py-3 px-6 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors"
              onClick={closeMenu}
            >
              Products
            </Link>

            <Link
              href="/orders"
              className="block py-3 px-6 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors"
              onClick={closeMenu}
            >
              Orders
            </Link>

            <Link
              href="/about"
              className="block py-3 px-6 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors"
              onClick={closeMenu}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="block py-3 px-6 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors"
              onClick={closeMenu}
            >
              Contact
            </Link>

            <div className="border-t border-green-200 my-2"></div>

            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left py-3 px-6 text-red-600 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/orders"
                className="block py-3 px-6 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;