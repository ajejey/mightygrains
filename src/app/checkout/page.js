'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { account } from '@/lib/appwrite-client';
import { createShippingInfo } from './shipping-info/actions';
import { syncUserCart } from './actions';
import { ShippingForm, OrderSummary, AuthModal } from './components';
import { account } from '@/appwrite/clientConfig';
import { getUserByAppwriteId } from '../actions';
import AuthEmailOtpModal from './components/AuthEmailOtpModal';
import CheckoutLoading from './loading';

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shippingFormErrors, setShippingFormErrors] = useState({});
  const [userDetailsLoading, setUserDetailsLoading] = useState(true);
  const [shippingLoading, setShippingLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndCart() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        const userDetails = await getUserByAppwriteId(currentUser.$id);
        setUserDetails(userDetails);
        setUserDetailsLoading(false);

        // Fetch cart items from local storage or state management
        const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        console.log("STORED CART ITEMS", storedCartItems);
        // if cart is empty send users to products page
        if (storedCartItems.items.length === 0) {
          router.push('/products');
        }
        setCartItems(storedCartItems);
      } catch (error) {
        // If no active session, show auth modal
        setShowAuthModal(true);
        // Try to fetch cart items even without authentication
        const storedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        // if cart is empty send users to products page
        if (storedCartItems.length === 0) {
          router.push('/products');
        }
        setCartItems(storedCartItems);
      }
    }

    fetchUserAndCart();
  }, [showAuthModal]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const validateShippingInfo = (shippingData) => {
    const errors = {};

    // Full Name validation
    if (!shippingData.fullName || shippingData.fullName.trim().length < 2) {
      errors.fullName = 'Full name is required and must be at least 2 characters long';
    }

    // Phone Number validation
    const phoneRegex = /^[+]?[\d\s()-]{8,20}$/; // Flexible international phone number format
    if (!shippingData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(shippingData.phone)) {
      errors.phone = 'Invalid phone number. Must be 8-20 characters long and contain only digits, spaces, (), or -';
    }

    // Address validation
    if (!shippingData.address || shippingData.address.trim().length < 5) {
      errors.address = 'Address is required and must be at least 5 characters long';
    }

    // City validation
    if (!shippingData.city || shippingData.city.trim().length < 2) {
      errors.city = 'City is required';
    }

    // State/Province validation
    if (!shippingData.state || shippingData.state.trim().length < 2) {
      errors.state = 'State/Province is required';
    }

    // Postal Code validation
    const postalCodeRegex = /^[1-9][0-9]{5}$/; // Indian PIN code format
    if (!shippingData.pincode) {
      errors.pincode = 'Postal code is required';
    } else if (!postalCodeRegex.test(shippingData.pincode)) {
      errors.pincode = 'Invalid postal code format. Must be a 6-digit number starting with a non-zero digit';
    }


    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleShippingSubmit = async (shippingData) => {
    // Validate shipping information before setting loading state
    const { isValid, errors } = validateShippingInfo(shippingData);
    
    // If validation fails, set errors and stop submission
    if (!isValid) {
      setShippingFormErrors(errors);
      return; // Don't proceed with submission
    }

    setShippingLoading(true);
    
    try {
      // Clear any previous errors
      setShippingFormErrors({});

      // Ensure cart is not empty
      if (!cartItems?.items?.length) {
        console.error('Your cart is empty. Please add items before checkout.');
        router.push('/products');
        return;
      }

      // Create or update shipping info
      await createShippingInfo(user.$id, {
        ...shippingData,
        email: user.email,
        fullName: shippingData.fullName || user.name,
      });

      // Sync cart for the user
      await syncUserCart(user.$id, cartItems.items);

      // Only redirect after all operations are complete
      router.push('/payment');
    } catch (error) {
      console.error('Error during checkout:', error);
      setShippingFormErrors({ 
        submit: 'An error occurred during checkout. Please try again.' 
      });
    } finally {
      setShippingLoading(false);
    }
  };

  if (showAuthModal) {
    return (
      <AuthEmailOtpModal  
        onAuthSuccess={handleAuthSuccess}
        initialEmail=""
        initialFullName=""
      />
    );
  }

  if (!user) {
    return <CheckoutLoading />;
  }

  console.log("cartItems", cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <ShippingForm 
            onSubmit={handleShippingSubmit} 
            shippingLoading={shippingLoading}
            initialData={{
              email: user.email,
              fullName: user.name,
              userDetails: userDetails,
              userDetailsLoading: userDetailsLoading
            }} 
            errors={shippingFormErrors}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <OrderSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}
