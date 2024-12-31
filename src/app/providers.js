'use client';
import { CartProvider } from '@/context/CartContext';

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import SuspendedPostHogPageView from './PostHogPageView';

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        capture_pageview: false,
        capture_pageleave: true,
    })
}


export function Providers({ children }) {
    return (
        <PostHogProvider client={posthog}>
            <CartProvider>
            <SuspendedPostHogPageView />
                {children}
            </CartProvider>
        </PostHogProvider>
    );
}
