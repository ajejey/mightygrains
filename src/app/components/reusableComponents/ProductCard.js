'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaShoppingCart, FaPlus, FaMinus, FaClock } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

// Import CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductCard.css';

const truncateText = (text, maxLength = 100) => {
  // if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  // Check if product is already in cart and set initial quantity
  useEffect(() => {
    const cartItem = cart.items.find(item => item.product.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cart.items, product.id]);

  const handleAddToCart = async () => {
    try {
      addToCart(product, 1);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      updateQuantity(product.id, quantity + 1);
      setQuantity(prev => prev + 1);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleDecreaseQuantity = async () => {
    try {
      if (quantity > 1) {
        updateQuantity(product.id, quantity - 1);
        setQuantity(prev => prev - 1);
      } else {
        removeFromCart(product.id);
        setQuantity(0);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  console.log('truncateText(product.fullDescription' , truncateText(product.fullDescription || '', 400));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group h-full flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-shrink-0">
        <div className="relative">
          <Slider 
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            className="product-slider"
            dotsClass="slick-dots custom-dots"
          >
            {product.images.map((image, index) => (
              <div key={index} className="relative w-full aspect-square">
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="md:p-2 transition-all duration-300 object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Link>

      <div className="flex-grow flex flex-col p-2 sm:p-4">
        <Link href={`/products/${product.id}`} className="flex-grow">
          <h3 className="text-sm sm:text-lg font-semibold text-amber-800 mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
          {product.lowStock && (
            <div className="flex items-center space-x-1 mb-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <FaClock className="mr-1" /> Sold out. Next batch in 3 days
              </span>
            </div>
          )}
          <p dangerouslySetInnerHTML={{ __html: truncateText(product.fullDescription || '', 180) }} className="text-gray-600 text-xs sm:text-base mb-2 sm:mb-4 line-clamp-4">
          </p>
        </Link>
        
        <div className="mt-auto">
          <span className="text-green-600 font-bold text-base sm:text-xl block mb-2">
            ₹{product.price.amount.toFixed(2)} 
            <span className="text-gray-400 text-xs sm:text-sm font-normal"> / {product.price.unit}</span> 
          </span>
          
          <div className="flex items-center justify-between">
            {quantity === 0 ? (
              <button 
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                <FaShoppingCart className="mr-1 sm:mr-2 text-xs sm:text-base" /> Add to Cart
              </button>
            ) : (
              <div className="flex items-center w-full bg-green-50 rounded-lg overflow-hidden">
                <button 
                  onClick={handleDecreaseQuantity}
                  className="p-2 sm:p-4 bg-green-300 hover:bg-green-400 transition-colors"
                >
                  <FaMinus className="text-green-700 text-xs sm:text-base" />
                </button>
                <span className="flex-grow text-center text-green-800 font-semibold text-sm sm:text-base">
                  {quantity}
                </span>
                <button 
                  onClick={handleIncreaseQuantity}
                  className="p-2 sm:p-4 bg-green-300 hover:bg-green-400 transition-colors"
                >
                  <FaPlus className="text-green-600 text-xs sm:text-base" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;