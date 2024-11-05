"use client";
import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';


const ContactPage = () => {


  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Get in Touch</h1>
          <p className="text-xl text-amber-800 mb-12 text-center max-w-3xl mx-auto">
            We&apos;d love to hear from you! Whether you have a question about our products, need assistance, or just want to say hello, we&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-amber-600 mt-1 mr-4" />
                <p className="text-amber-800">
                  14 Paras Nivas, Jayanna Layout,<br />
                  HV Halli, RR Nagar,<br />
                  Bangalore, Karnataka 560098,<br />
                  India
                </p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-amber-600 mr-4" />
                <a href="mailto:mightygrains656@gmail.com" className="text-amber-800 hover:text-green-600 transition-colors">
                  mightygrains656@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-amber-600 mr-4" />
                <a href="tel:+917829288011" className="text-amber-800 hover:text-green-600 transition-colors">
                  +91 7829288011
                </a>
              </div>
              {/* <div className="flex items-start">
                <FaClock className="text-amber-600 mt-1 mr-4" />
                <p className="text-amber-800">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div> */}
            </div>
          </div>

          <div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-green-700 mb-6">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-amber-800 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-amber-800 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-amber-800 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-2 rounded-md border border-amber-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=jayanna%20layout,%20rajarajeshwari%20nagar+(Mighty%20Grains)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
