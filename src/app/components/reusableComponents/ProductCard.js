'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

// Import CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group">
      <Link href={`/products/${product.id}`}>
        <div className="relative">
          <Slider 
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {product.images.map((image, index) => (
              <div key={index} className="relative w-full aspect-square">
                <Image
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="p-2 transition-all duration-300 object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Link>

      <div className="mt-4 p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-amber-700 mb-4 line-clamp-3">
            {truncateText(product.fullDescription || '', 80)}
          </p>
        </Link>
        
          <span className="text-green-600 font-bold text-xl mb-4">
            ₹{product.price.amount.toFixed(2)}
          </span>
        <div className="flex items-center justify-between mt-4">
          
          {quantity === 0 ? (
            <button 
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          ) : (
            <div className="flex items-center w-full bg-green-50 rounded-lg overflow-hidden">
              <button 
                onClick={handleDecreaseQuantity}
                className="p-4 bg-green-300 hover:bg-green-400 transition-colors"
              >
                <FaMinus className="text-green-700"  />
              </button>
              <span className="flex-grow text-center text-green-800 font-semibold">
                {quantity}
              </span>
              <button 
                onClick={handleIncreaseQuantity}
                className="p-4 bg-green-300 hover:bg-green-400 transition-colors"
              >
                <FaPlus className="text-green-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;