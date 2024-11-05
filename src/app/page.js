
import Image from 'next/image'
import Link from 'next/link'
import { FaLeaf, FaUserMd, FaAppleAlt, FaHistory, FaUtensils, FaAward, FaStar } from 'react-icons/fa'
import { GiWeightScale } from 'react-icons/gi'

import HeaderSection from './components/headerSection';
import HeroSection from './components/heroSection';
import TrustSignalsSection from './components/trustSignalsSection'
import ProductsSection from './components/productsSection'
import BenefitsSection from './components/benefitsSection';
import TestimonialSection from './components/testimonialSection';
import CtaSection from './components/ctaSection';
import FooterSection from './components/footerSection';
import AboutUsSection from './components/aboutUsSection';

export default function Home() {
  
  return (
    <main className="flex flex-col items-center justify-between bg-gray-50">
      {/* Header */}
      <HeaderSection />
     {/* Hero Section */}
      <HeroSection  />

      {/* Trust Signals */}
      <TrustSignalsSection />

      {/* Products Section */}
      <ProductsSection />

      {/* Benefits Section */}
      {/* <BenefitsSection /> */}

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* About us Section */}
      <AboutUsSection />

      {/* CTA Section */}
      <CtaSection />

      {/* <FooterSection /> */}
    </main>
  )
}