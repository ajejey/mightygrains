import React from 'react'
import SupportBanner from '@/components/SupportBanner';

const layout = ({ children }) => {
  return (
    <div>
      {children}
      <SupportBanner />
    </div>
  )
}

export default layout