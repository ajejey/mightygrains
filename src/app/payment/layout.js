import SupportBanner from '@/components/SupportBanner'
import React from 'react'
import SuspendedPostHogPageView from '../PostHogPageView';

const PaymentLayout = ({ children }) => {
  return (
    <div>
      <SuspendedPostHogPageView />
      {children}
      <SupportBanner />
    </div>
  )
}

export default PaymentLayout