import React from 'react'
import HeaderSection from '../components/headerSection'

export const metadata = {
    title: 'About Mighty Grains | Traditional South Indian Baby Food',
    description: 'Learn about Mighty Grains\' mission to provide nutritious, traditional South Indian baby food. Discover our story, philosophy, and commitment to natural ingredients for babies 6 months and above.',
    openGraph: {
      title: 'About Mighty Grains | Nurturing Traditions for Little Ones',
      description: 'Discover the story behind Mighty Grains, our commitment to traditional South Indian baby food, and our passion for nurturing healthy babies with natural ingredients.',
      url: 'https://www.mightygrains.in/about',
      siteName: 'Mighty Grains',
      images: [
        {
          url: 'https://www.mightygrains.in/opengraph-image.png', 
          width: 1200,
          height: 630,
          alt: 'Mighty Grains About Us',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Mighty Grains | Traditional South Indian Baby Food',
      description: 'Learn about our mission to provide nutritious, traditional South Indian baby food. Discover our story and commitment to natural ingredients.',
      images: {
        url: 'https://www.mightygrains.in/twitter-image.png', 
        alt: 'Mighty Grains About Us',
      },
    },
    keywords: ['baby food', 'South Indian', 'traditional recipes', 'natural ingredients', 'Mighty Grains story', 'baby nutrition', 'about us'],
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