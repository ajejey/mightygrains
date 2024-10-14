import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaFacebookF } from 'react-icons/fa';

const CtaButton = ({ href, icon: Icon, text, primary = false }) => (
  <Link href={href} className={`
    flex items-center justify-center 
    ${primary ? 'bg-white text-amber-600 hover:bg-amber-100' : 'bg-amber-700 text-white hover:bg-amber-800'}
    py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-300 mb-4 md:mb-0
  `}>
    <Icon className="mr-2" />
    {text}
  </Link>
);

const CtaSection = () => {
  return (
    <section id="contact" className="w-full bg-gradient-to-b from-amber-300 to-amber-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-700 mb-6">Join Our Mighty Grains Community!</h2>
        <p className="text-xl text-amber-600 mb-8">
          Become part of our growing family of health-conscious parents. Get expert advice, share your experiences, and stay updated on the latest in baby nutrition.
        </p>
        
        <div className="flex justify-center items-center mb-12">
          <CtaButton 
            href="https://wa.me/7829288011?text=I'm interested in Mighty Grains products" 
            icon={FaWhatsapp} 
            text="Contact Us" 
            primary={true}
          />
          {/* <CtaButton 
            href="#subscribe" 
            icon={FaEnvelope} 
            text="Subscribe to Newsletter" 
          /> */}
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-amber-700 mb-4">Follow Us for Daily Tips & Recipes</h3>
          <div className="flex justify-center space-x-6">
            <Link href="https://www.instagram.com/mighty.grains/" target='_blank' className="text-amber-700 hover:text-amber-200 transition-colors">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://www.facebook.com/p/Mighty-Grains-100070789485341/" className="text-amber-700 hover:text-amber-200 transition-colors">
              <FaFacebookF size={24} />
            </Link>
          </div>
        </div>
        
        {/* <div className="mt-12 bg-amber-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">Got Questions?</h3>
          <p className="text-amber-100 mb-6">Our nutrition experts are here to help! Schedule a free consultation today.</p>
          <Link href="#book-consultation" className="inline-block bg-white text-amber-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-amber-100 transition-colors">
            Book Free Consultation
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CtaSection;