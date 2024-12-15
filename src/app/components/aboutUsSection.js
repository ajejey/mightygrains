import React from 'react';
import Image from 'next/image';
import { FaLeaf, FaHeart, FaBaby } from 'react-icons/fa';
import dd from '../assets/images/DSC03087.JPG';
import Link from 'next/link';

const ValueProp = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center mb-8">
    <div className="bg-amber-100 rounded-full p-3 mb-4">
      <Icon className="text-amber-600 text-3xl" />
    </div>
    <h3 className="text-xl font-semibold text-amber-800 mb-2">{title}</h3>
    <p className="text-amber-700">{description}</p>
  </div>
);

const AboutUsSection = () => {
  return (
    <section id="about" className="w-full bg-gradient-to-b from-white to-amber-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">Our Story</h2>
          <p className="text-xl text-amber-700">From One Mother&apos;s Kitchen to Yours</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <Image
              src={dd}
              alt="Founder Dayani"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-amber-800 mb-4">Meet Dayani Prasad</h3>
            <p className="text-amber-700 mb-4">
              As a new mother in Bangalore, I faced the same challenge many parents do: finding nutritious, 
              wholesome food for my growing baby. Despite the abundance of packaged options, I yearned for 
              something that aligned with our rich South Indian culinary traditions.
            </p>
            <p className="text-amber-700 mb-4">
              Turning to my roots, I rediscovered the power of Ragi and other millets – staples that 
              had nourished generations before us. As I began incorporating these into my baby&apos;s diet, 
              I witnessed a remarkable transformation in his health and vitality.
            </p>
            <p className="text-amber-700 mb-4">
              This personal journey inspired me to share these time-tested recipes with other parents. 
              Thus, Mighty Grains was born – a labor of love from my kitchen to yours, carrying forward 
              the wisdom of our ancestors while meeting the nutritional needs of today&apos;s children.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ValueProp 
            icon={FaLeaf}
            title="Traditional Wisdom"
            description="We harness the nutritional power of age-old South Indian ingredients, proven effective over generations."
          />
          <ValueProp 
            icon={FaHeart}
            title="Made with Love"
            description="Every product is crafted with the same care and attention I give to my own child's meals."
          />
          <ValueProp 
            icon={FaBaby}
            title="Child-Approved"
            description="Developed and lab tested to appeal to little taste buds while providing optimal nutrition."
          />
        </div>
        
        <div className="text-center mt-16">
          <p className="text-xl text-amber-800 font-semibold mb-6">
            Join us in nurturing the next generation with the goodness of traditional foods.
          </p>
          <Link href="/products" >
          <button className="bg-amber-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors">
            Explore Our Products
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;