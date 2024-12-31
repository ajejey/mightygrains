import React from 'react'
import HeaderSection from '../components/headerSection'
import SuspendedPostHogPageView from '../PostHogPageView'

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