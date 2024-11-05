import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const FooterSection = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-amber-800 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mighty Grains</h3>
            <p className="mb-4">Nourishing little ones with love and tradition.</p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-amber-300 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-amber-300 transition-colors">Our Products</Link></li>
              <li><Link href="/about" className="hover:text-amber-300 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-amber-300 transition-colors">Terms and Conditions</Link></li>
              {/* <li><Link href="/shipping-policy" className="hover:text-amber-300 transition-colors">Shipping Policy</Link></li> */}
              <li><Link href="/return-policy" className="hover:text-amber-300 transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="mb-2">Email: mightygrains656@gmail.com</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/p/Mighty-Grains-100070789485341/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <FaFacebookF size={20} />
              </Link>
              <Link href="https://www.instagram.com/mighty.grains/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://wa.me/917829288011" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
                <FaWhatsapp size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-700 text-center">
          <p>© {currentYear} Mighty Grains. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection