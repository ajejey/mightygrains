import React from 'react'
import HeaderSection from '../components/headerSection';
import SuspendedPostHogPageView from '../PostHogPageView';


export const metadata = {
    title: 'Contact Us | Mighty Grains',
    description: 'Get in touch with Mighty Grains for any queries about our traditional South Indian baby food products. We\'re here to help!',
  };

const layout = ({ children }) => {
  return (
    <div>
        <HeaderSection />
        <SuspendedPostHogPageView />
      {children}
    </div>
  )
}

export default layout