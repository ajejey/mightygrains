import React from 'react'
import HeaderSection from '../components/headerSection';

export const metadata = {
    title: 'Privacy Policy | Mighty Grains',
    description: 'Read about how Mighty Grains protects your privacy and handles your personal information.',
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