import SuspendedPostHogPageView from '@/app/PostHogPageView';
import React from 'react'

export default function OrdersLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <SuspendedPostHogPageView />
            {children}
        </div>
    );
}