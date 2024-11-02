import React from 'react'
import HeaderSection from '../components/headerSection'

export const metadata = {
  title: 'Our Products | Mighty Grains Traditional Baby Food',
  description: 'Explore our range of nutritious, traditional South Indian baby food products. From Sprouted Sattu Maavu to Ragi Huri Hittu, find the perfect meal for your little one.',
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