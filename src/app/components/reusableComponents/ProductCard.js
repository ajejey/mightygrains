'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
    <FaChevronRight className="text-green-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-200">
    <FaChevronLeft className="text-green-800" />
  </button>
);

const ProductCard = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <div key={index} className="relative w-full">
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                width={300}
                height={300}
                className="mx-auto p-4 transition-all duration-300  object-contain"
              />
            </div>
            ))}
          </Slider>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-2">{product.name}</h3>
          <p className="text-amber-700 mb-4 line-clamp-3">{product.fullDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;