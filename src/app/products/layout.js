import React from 'react'
import HeaderSection from '../components/headerSection'

export const metadata = {
  title: 'Our Products | Mighty Grains Traditional Baby Food',
  description: 'Discover our range of nutritious, traditional South Indian baby food products. From Sprouted Sattu Maavu to Ragi Huri Hittu, find the perfect meal for your little one.',
  openGraph: {
    title: 'Our Products | Mighty Grains Traditional Baby Food',
    description: 'Explore our range of nutritious, traditional South Indian baby food products. Handcrafted with love for your baby\'s healthy growth.',
    url: 'https://www.mightygrains.in/products',
    siteName: 'Mighty Grains',
    images: [
      {
        url: 'https://www.mightygrains.in/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Mighty Grains Product Range',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Products | Mighty Grains Traditional Baby Food',
    description: 'Explore our range of nutritious, traditional South Indian baby food products. Handcrafted with love for your baby\'s healthy growth.',
    images: ['https://www.mightygrains.com/opengraph-image.png'],
    creator: '@mightygrains',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['baby food', 'South Indian', 'traditional recipes', 'organic baby food', 'Ragi', 'Sattu Maavu', 'nutritious baby meals', 'Mighty Grains'],
  authors: [{ name: 'Mighty Grains' }],
  category: 'Baby Food',
  alternates: {
    canonical: 'https://www.mightygrains.in/products',
  },
  other: {
    'og:site_name': 'Mighty Grains',
    'og:locale': 'en_IN',
    'og:type': 'website',
  },
};

const layout = ({ children }) => {
  return (
    <div>
        <HeaderSection />
        {children}
    </div>
  )
}

export default layout