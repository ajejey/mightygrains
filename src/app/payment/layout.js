import SupportBanner from '@/components/SupportBanner'
import React from 'react'

const PaymentLayout = ({ children }) => {
  return (
    <div>
      {children}
      <SupportBanner />
    </div>
  )
}

export default PaymentLayout