import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaLeaf, FaHeart, FaBaby, FaShieldAlt } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="bg-amber-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="relative mb-12 py-8 px-4 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg shadow-lg overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-your-texture-image.png')] opacity-10"></div>
                    <h1 className="relative text-4xl md:text-5xl font-extrabold text-green-800 mb-4 text-center">
                        Welcome to <span className="text-amber-600">MIGHTY<span className="font-light">GRAINS</span></span>
                    </h1>
                    <p className="relative text-xl md:text-2xl text-green-700 text-center font-light">
                        Nurturing from Nature, One Bowl at a Time
                    </p>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-600 rounded-full -mb-12 -mr-12 opacity-20"></div>
                </div>

                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg p-8 mb-12 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-leaf-pattern.png')] opacity-5"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-semibold text-green-800 mb-6 border-b-2 border-amber-300 pb-2 inline-block">Our Story</h2>
                        <p className="text-amber-800 mb-6 leading-relaxed">
                            At Mighty Grains, we believe in the power of wholesome nutrition. As a mom, I started this journey because I deeply believe in the traditional food practices that have sustained families for generations. I wanted my child to experience the same nourishing foods that shaped my upbringing.
                        </p>
                        <p className="text-amber-800 leading-relaxed">
                            With this passion, I created Mighty Grains—a place where we can share the joy of healthy eating and ensure our children grow up strong and vibrant.
                        </p>
                        {/* <div className="mt-8 flex justify-end">
                            <span className="text-green-700 italic font-medium">- Founder, Mighty Grains</span>
                        </div> */}
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-600 rounded-full -mb-12 -mr-12 opacity-10"></div>
                </div>

                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg p-8 mb-12 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-grain-pattern.png')] opacity-5"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-semibold text-green-800 mb-6 border-b-2 border-amber-300 pb-2 inline-block">Our Philosophy</h2>
                        <p className="text-amber-800 leading-relaxed">
                            Every product at Mighty Grains is crafted with love and care, using fresh, made-to-order porridge mixes designed specifically for babies and toddlers. We are dedicated to preserving the age-old traditions of wholesome food practices, emphasizing the importance of feeding our children meals that are rich in nutrients and flavors.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
                                    <FaHeart className="text-green-600 text-2xl" />
                                </div>
                                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
                                    <FaLeaf className="text-green-600 text-2xl" />
                                </div>
                                <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center">
                                    <FaBaby className="text-green-600 text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300 rounded-full -mt-12 -mr-12 opacity-10"></div>
                </div>

                <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg p-8 mb-12 overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-grain-texture.png')] opacity-5"></div>
  <div className="relative z-10">
    <h2 className="text-3xl font-semibold text-green-800 mb-8 border-b-2 border-green-300 pb-2 inline-block">Why Choose Mighty Grains?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { icon: FaLeaf, title: "Natural Ingredients", description: "We use only the finest, non-GMO ingredients sourced from trusted suppliers." },
        { icon: FaHeart, title: "Made to Order", description: "Our porridge mixes are prepared fresh, ensuring maximum flavor and nutritional value." },
        { icon: FaBaby, title: "Family Tradition", description: "Our recipes are inspired by traditional food practices, reflecting wholesome meals passed down through generations." },
        { icon: FaShieldAlt, title: "Safety First", description: "All of our products undergo rigorous testing to meet the highest safety standards." }
      ].map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <item.icon className="text-green-600 text-2xl" />
            </div>
            <h3 className="font-semibold text-green-800 text-xl">{item.title}</h3>
          </div>
          <p className="text-amber-700 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
  <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-200 rounded-full -mb-16 -mr-16 opacity-20"></div>
</div>

<div className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg p-8 mb-12 overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-[url('/path-to-family-texture.png')] opacity-5"></div>
  <div className="relative z-10">
    <h2 className="text-3xl font-semibold text-green-800 mb-6 border-b-2 border-amber-300 pb-2 inline-block">Join the Mighty Grains Family</h2>
    <div className="bg-white bg-opacity-70 rounded-lg p-6 mb-8 shadow-inner">
      <p className="text-amber-800 mb-4 leading-relaxed">
        Choosing Mighty Grains means you&apos;re embracing a community of like-minded parents who value the health and happiness of their families. Let us help you nurture your child with the goodness of nature, one bowl at a time.
      </p>
      <p className="text-amber-800 mb-4 leading-relaxed">
        Explore our range of wholesome porridge mixes today and discover why Mighty Grains is the trusted choice for families seeking the best nutrition for their little ones. Together, let&apos;s lay the foundation for a healthy future, rooted in love and tradition.
      </p>
      <p className="text-green-800 font-semibold text-center text-xl mt-6">
        Mighty Grains: Because nurturing from nature starts with the food we share.
      </p>
    </div>
    <div className="text-center">
      <Link href="/products" className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-8 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
        Explore Our Products
      </Link>
    </div>
  </div>
  <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200 rounded-full -mb-16 -ml-16 opacity-30"></div>
</div>
            </div>
        </div>
    );
};

export default AboutPage;