'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaAward, FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ragiHurihittu from '../assets/images/ragi-hurihittu.png';
import sattuMaavuGrains from '../assets/images/sattu-maavu-grains.png';
import sproutedRagiSeri from '../assets/images/sprouted-ragi-seri.png';
import sproutedRagiSeriAlmonds from '../assets/images/sprouted-ragi-seri-almonds.png';

const FeatureBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm">
    <Icon className="text-amber-600 mr-2" />
    <span>{text}</span>
  </div>
);

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroImages = [
    { src: sproutedRagiSeri, alt: "Sprouted Ragi Seri" },
    { src: ragiHurihittu, alt: "Ragi Hurihittu" },
    { src: sattuMaavuGrains, alt: "Sattu Maavu Grains" },
    { src: sproutedRagiSeriAlmonds, alt: "Sprouted Ragi Seri with Almonds" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    cssEase: "linear",
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: dots => (
      <div className="absolute bottom-4 w-full">
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-amber-600 w-4' : 'bg-amber-300'
        }`}
      />
    ),
  };

  return (
    <section className="w-full bg-gradient-to-b from-amber-50 to-white text-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-24">
        {isMobile ? (
          // Mobile View
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-4 leading-tight">
              Nourish Your Baby with <span className="text-amber-600">Sprouted Ragi</span>
            </h1>
            
            <div className="w-full max-w-md mb-6">
              <Slider {...settings}>
                {heroImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="relative aspect-square w-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        className="object-cover rounded-2xl p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            <p className="text-lg mb-6">
              Discover traditional South Indian baby food, crafted with love and Ragi.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <FeatureBadge icon={FaLeaf} text="Preservatives free" />
              <FeatureBadge icon={FaAward} text="Fresh & Homemade" />
              <FeatureBadge icon={FaStar} text="Sugar & Salt free" />
            </div>
            <Link 
              href="/products" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-center mb-4 transition duration-300 ease-in-out"
            >
              Explore Our Products
            </Link>
            <Link 
              href="#contact" 
              className="w-full bg-white hover:bg-amber-100 text-amber-800 font-semibold py-3 px-6 border border-amber-600 rounded-full text-center transition duration-300 ease-in-out"
            >
              Contact Us
            </Link>
          </div>
        ) : (
          // Desktop View
          <div className="flex items-center gap-10">
            <div className="w-1/2">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                Nourish Your Baby with <span className="text-amber-600">Sprouted Ragi</span>
              </h1>
              <p className="text-xl mb-6">
                Discover traditional South Indian baby food, crafted with love and Ragi.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <FeatureBadge icon={FaLeaf} text="Preservatives free" />
                <FeatureBadge icon={FaAward} text="Fresh & Homemade" />
                <FeatureBadge icon={FaStar} text="Free from added Sugar & Salt" />
              </div>
              <div className="flex gap-4">
                <Link 
                  href="/products" 
                  className="bg-green-600 w-1/2 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Explore Products
                </Link>
                <Link 
                  href="#contact" 
                  className="bg-white w-1/2 hover:bg-amber-100 text-amber-800 font-semibold py-3 px-6 border border-amber-600 rounded-full text-center transition duration-300 ease-in-out"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="w-1/2">
              <div className="max-w-2xl mx-auto">
                <Slider {...settings}>
                  {heroImages.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="relative aspect-square w-full">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          priority={index === 0}
                          className="object-cover rounded-2xl p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;