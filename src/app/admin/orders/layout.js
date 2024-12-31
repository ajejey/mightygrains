import React from 'react'
import SuspendedPostHogPageView from '../PostHogPageView';

export default function OrdersLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <SuspendedPostHogPageView />
            {children}
        </div>
    );
}