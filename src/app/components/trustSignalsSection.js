import React from 'react';
import { FaLeaf, FaUserMd, FaAppleAlt, FaAward, FaStar, FaShieldAlt } from 'react-icons/fa';

const TrustSignal = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <Icon className="text-amber-500 text-4xl mb-2" />
    <h3 className="text-lg font-semibold text-amber-800 mb-1">{title}</h3>
    <p className="text-sm text-amber-700 text-center">{description}</p>
  </div>
);

const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-8 mb-4 rounded-lg shadow-md">
    <div className="flex justify-center items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 italic mb-2">&quot;{quote}&quot;</p>
    <p className="text-amber-800 font-semibold">{author}</p>
    <p className="text-amber-600 text-sm">{role}</p>
  </div>
);

const TrustSignalsSection = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-amber-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-800 text-center mb-8">Why Mothers Trust Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <TrustSignal 
            icon={FaLeaf} 
            title="100% Natural" 
            description="Made with organic ingredients, free from artificial additives and preservatives."
          />
          <TrustSignal 
            icon={FaUserMd} 
            title="Expert Approved" 
            description="Formulated and recommended by leading pediatricians and nutritionists."
          />
          <TrustSignal 
            icon={FaAppleAlt} 
            title="Nutrient-Rich" 
            description="Packed with essential vitamins and minerals for your baby's optimal growth."
          />
        </div>

        {/* <div className="bg-amber-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-2">Limited Time Offer!</h3>
          <p className="mb-4">Get 20% off your first order when you subscribe to our monthly delivery.</p>
          <button className="bg-white text-amber-500 py-2 px-6 rounded-full font-semibold hover:bg-amber-100 transition-colors">
            Subscribe Now
          </button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center">
            <FaAward className="text-amber-500 text-3xl mr-2" />
            <span className="text-amber-700">Award-Winning Formula</span>
          </div>
          <div className="flex items-center">
            <FaShieldAlt className="text-amber-500 text-3xl mr-2" />
            <span className="text-amber-700">100% Money-Back Guarantee</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default TrustSignalsSection;