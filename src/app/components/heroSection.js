'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaAward, FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa';
import babyEating from '../assets/images/babyeating.avif'
import ragiImage from '../assets/images/ragi-removebg.png'

const FeatureBadge = ({ icon: Icon, text }) => (
  <div className="flex items-center bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm">
    <Icon className="text-amber-600 mr-2" />
    <span>{text}</span>
  </div>
);

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-amber-50 to-white text-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {isMobile ? (
          // Mobile View
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-2 leading-tight">
              Nourish Your Baby with <span className="text-amber-600">Sprouted Ragi</span>
            </h1>
            <Image
              src={ragiImage}
              alt="Happy baby enjoying Mighty Grains"
              width={300}
              height={200}
              className="rounded-lg mb-2"
            />
            <p className="text-lg mb-6">
              Discover traditional South Indian baby food, crafted with love and Ragi.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <FeatureBadge icon={FaLeaf} text="Preservatives free" />
              <FeatureBadge icon={FaAward} text="Fresh & Homemade" />
              <FeatureBadge icon={FaStar} text="Suger & Salt free" />
            </div>
            <Link href="#products" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full text-center mb-4 transition duration-300 ease-in-out">
              Explore Our Products
            </Link>
            <Link  target='_blank' href={`https://wa.me/7829288011?text=I'm interested in Mighty Grains products`} className="w-full bg-white hover:bg-amber-100 text-amber-800 font-semibold py-3 px-6 border border-amber-600 rounded-full text-center transition duration-300 ease-in-out">
              Contact Us
            </Link>
            {/* <Link target='_blank' href={`https://wa.me/7829288011?text=I'm interested in Mighty Grains products`}>
              <button className="flex items-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full transition-colors">
                <FaWhatsapp className="mr-2" /> Contact Us
              </button>
            </Link> */}
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
                <Link href="#products" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105">
                  Explore Our Products
                </Link>
                <Link href="#contact" className="bg-white hover:bg-amber-100 text-amber-800 font-semibold py-3 px-6 border border-amber-600 rounded-full text-center transition duration-300 ease-in-out">
                  Contact Us
                </Link>
                {/* <Link target='_blank' href={`https://wa.me/7829288011?text=I'm interested in Mighty Grains products`}>
                  <button className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105">
                    <FaWhatsapp className="mr-2" /> Contact Us
                  </button>
                </Link> */}
              </div>
            </div>
            <div className="w-1/2 relative">
              <div className="ml-10 relative z-10 rounded-lg overflow-hidden ">
                <Image
                  src={ragiImage}
                  alt="Happy baby enjoying Mighty Grains"
                  width={400}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="mr-10 absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200 rounded-full opacity-50"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;




// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import { FaAward, FaLeaf, FaStar } from 'react-icons/fa'
// import babyEating from '../assets/images/babyeating.avif'

// const HeroSection = () => {
//   return (
//     <section className="w-full bg-gradient-to-b from-amber-200 to-white text-white">
//     <div className="max-w-7xl mx-auto px-4 py-12 md:py-24">
//       <div className="flex flex-col md:flex-row items-center gap-10">
//         <div className="md:w-1/2 mb-10 md:mb-0">
//           <h1 className="text-green-700 text-4xl md:text-5xl font-bold mb-4 leading-tight">
//             Nourish Your Baby with Sprouted Ragi
//           </h1>
//           <p className="text-xl mb-6 text-amber-600">
//             Discover traditional South Indian baby food, crafted with love and Ragi.
//           </p>
//           <div className="flex flex-wrap gap-4 mb-8">
//             <div className="flex items-center bg-amber-600 bg-opacity-30 text-green-700 rounded-full px-3 py-1">
//               <FaLeaf className="text-yellow-700 mr-2" />
//               <span>100% Natural</span>
//             </div>
//             <div className="flex items-center bg-amber-600 bg-opacity-30 text-green-700 rounded-full px-3 py-1">
//               <FaAward className="text-yellow-700 mr-2" />
//               <span>Pediatrician Approved</span>
//             </div>
//             <div className="flex items-center bg-amber-600 bg-opacity-30 text-green-700 rounded-full px-3 py-1">
//               <FaStar className="text-yellow-700 mr-2" />
//               <span>4.9/5 Parent Rating</span>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Link href="#products" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-full text-center transition duration-300 ease-in-out transform hover:scale-105">
//               Explore Our Products
//             </Link>
//             <Link href="#contact" className="bg-transparent hover:bg-green-800 text-green-800 font-semibold hover:text-white py-3 px-6 border border-green-700 hover:border-transparent rounded-full text-center transition duration-300 ease-in-out">
//               Contact Us
//             </Link>
//           </div>
//         </div>
//         <div className="md:w-1/2 relative">
//           <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
//             <Image
//               src={babyEating}
//               alt="Happy baby enjoying Mighty Grains"
//               width={600}
//               height={400}
//               className="object-cover"
//             />
//           </div>
//           <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-green-200 rounded-full opacity-50"></div>
//         </div>
//       </div>
//     </div>
//   </section>
//   )
// }

// export default HeroSection