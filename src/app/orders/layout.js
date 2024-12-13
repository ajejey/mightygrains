'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/app/checkout/components/AuthModal';
import { checkUserSession } from '@/lib/auth-utils';
import OrdersLoading from './loading';

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
      <AuthModal 
        onAuthSuccess={handleAuthSuccess} 
        initialEmail=""
      />
    );
  }

  return isAuthenticated ? (
    <div className="container mx-auto px-4 py-8">
      {children}
    </div>
  ) : null;
}