'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/app/checkout/components/AuthModal';
import { checkUserSession } from '@/lib/auth-utils';
import OrdersLoading from './loading';
import AuthEmailOtpModal from '../checkout/components/AuthEmailOtpModal';
import SuspendedPostHogPageView from '../PostHogPageView';

export default function OrdersLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const { isLoggedIn } = await checkUserSession();
        
        if (!isLoggedIn) {
          setShowAuthModal(true);
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setShowAuthModal(true);
        setIsLoading(false);
      }
    };

    verifyAuthentication();
  }, []);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setIsAuthenticated(true);
    // Optional: Refresh the current page
    window.location.reload();
  };

  if (isLoading) {
    return <OrdersLoading />;
  }

  if (showAuthModal) {
    return (
      // <AuthModal 
      <AuthEmailOtpModal 
        onAuthSuccess={handleAuthSuccess} 
        initialEmail=""
      />
    );
  }

  return isAuthenticated ? (
    <div className="container mx-auto">
      <SuspendedPostHogPageView />
      {children}
    </div>
  ) : null;
}