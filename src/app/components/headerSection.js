'use client';
import Link from 'next/link'
import React, { useState } from 'react'

const HeaderSection = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    // <header className="w-full bg-gradient-to-r from-green-700 to-green-800 text-white shadow-sm top-0 z-50">
    <header className="w-full bg-amber-50 text-green-800 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              {/* <Image src="/logo.png" alt="Mighty Grains Logo" width={20} height={20} /> */}
              <span className="text-3xl uppercase tracking-wide">
                <span className='text-green-800 font-bold'>
                 Mighty
                </span>
                <span className="text-green-800">Grains</span>
                </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/products" className="text-green-700 hover:text-green-600 transition-colors">Products</Link>
              <Link href="/about" className="text-green-700 hover:text-green-600 transition-colors">About Us</Link>
              <Link href="#contact" className="text-green-700 hover:text-green-600 transition-colors">Contact</Link>
            </nav>
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
              <Link href="/about" className="block py-2 text-green-700 hover:text-green-600 transition-colors">About Us</Link>
              <Link href="#contact" className="block py-2 text-green-700 hover:text-green-600 transition-colors">Contact</Link>
            </div>
          )}
        </div>
      </header>
  )
}

export default HeaderSection