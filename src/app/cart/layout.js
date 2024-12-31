import React from 'react'
import SupportBanner from '@/components/SupportBanner';
import SuspendedPostHogPageView from '@/app/PostHogPageView';

const layout = ({ children }) => {
  return (
    <div>
      <SuspendedPostHogPageView />
      {children}
      <SupportBanner />
    </div>
  )
}

export default layout