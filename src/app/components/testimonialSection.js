'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import { testimonials } from '../constants/products';
import { FcGoogle } from "react-icons/fc";


const TestimonialCard = ({ quote, author, role, rating }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mx-4 mb-8 transition-all duration-300 hover:shadow-xl">
    <div className="flex justify-between mb-6">
      <FcGoogle className='text-2xl' />
      <div className='flex justify-center'>
        {[...Array(rating)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-xl" />
      ))}
      </div>      
      <FcGoogle className='text-2xl opacity-0' />      
    </div>
    <FaQuoteLeft className="text-amber-500 text-4xl mb-4" />
    <blockquote className="text-lg italic text-amber-700 mb-4">
      &quot;{quote}&quot;
    </blockquote>
    <p className="text-amber-800 font-semibold">{author}</p>
    <p className="text-amber-600">{role}</p>
  </div>
);

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full bg-gradient-to-b from-amber-100 to-amber-200 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-800 text-center mb-12">
          Trusted by Happy Parents Everywhere
        </h2>
        <div className="relative">
          {isSmallScreen ? (
            <TestimonialCard {...testimonials[currentTestimonial]} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          )}
          {isSmallScreen && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white rounded-full p-2 focus:outline-none"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white rounded-full p-2 focus:outline-none"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
        <div className="text-center mt-12">
          <p className="text-amber-700 font-semibold text-lg">Join thousands of satisfied parents!</p>
          <Link target='_blank' href={`https://wa.me/7829288011?text=I'm interested in Mighty Grains products`}> 
          <button className="mt-4 bg-amber-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-amber-600 transition-colors">
            Try Mighty Grains Today
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;