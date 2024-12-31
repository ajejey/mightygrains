import React from 'react'
import SuspendedPostHogPageView from '../PostHogPageView';

const layout = ({ children }) => {
  return (
    <div>
      <SuspendedPostHogPageView />
      {children}
    </div>
  )
}

export default layout