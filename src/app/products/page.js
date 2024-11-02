'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaChevronRight, FaLeaf, FaBaby, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { products } from '../constants/products';
import ProductCard from '../components/reusableComponents/ProductCard';



const ProductsPage = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium text-amber-600 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-amber-800 transition-colors duration-200 flex items-center">
                <FaHome className="mr-1" />
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <FaChevronRight className="text-amber-400 mx-1" aria-hidden="true" />
              <span className="text-amber-800">Products</span>
            </li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-green-800 mb-8 text-center">
            Nourish Your Little One
          </h1>
          <p className="text-xl text-amber-800 mb-12 text-center max-w-3xl mx-auto">
            Discover our range of nutritious, traditional South Indian baby food products. 
            Crafted with love and care for your baby&apos;s healthy growth.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-8 mb-12">
          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
            <FaLeaf className="text-4xl text-green-600 mb-2" />
            <span className="text-amber-800 font-semibold">100% Natural</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
            <FaBaby className="text-4xl text-green-600 mb-2" />
            <span className="text-amber-800 font-semibold">Baby-Friendly</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
            <FaHeart className="text-4xl text-green-600 mb-2" />
            <span className="text-amber-800 font-semibold">Made with Love</span>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/contact" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 inline-flex items-center">
            Get Personalized Recommendations
            <FaChevronRight className="ml-2" />
          </Link>
        </motion.div> */}
      </div>
    </div>
  );
};

export default ProductsPage;