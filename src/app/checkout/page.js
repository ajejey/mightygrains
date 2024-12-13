'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { account } from '@/lib/appwrite-client';
import { createShippingInfo } from './shipping-info/actions';
import { syncUserCart } from './actions';
import { ShippingForm, OrderSummary, AuthModal } from './components';
import { account } from '@/appwrite/clientConfig';
import { getUserByAppwriteId } from '../actions';

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shippingFormErrors, setShippingFormErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndCart() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        const userDetails = await getUserByAppwriteId(currentUser.$id);
        setUserDetails(userDetails);

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
    console.log("SHIPPING DATA", shippingData);
    // Validate shipping information
    const { isValid, errors } = validateShippingInfo(shippingData);
    console.log("VALID", isValid);
    console.log("ERRORS", errors);
    
    // If validation fails, set errors and stop submission
    if (!isValid) {
      setShippingFormErrors(errors);
      return;
    }

    try {
      // Clear any previous errors
      setShippingFormErrors({});

      // Ensure cart is not empty
      if (cartItems.length === 0) {
        console.error('Your cart is empty. Please add items before checkout.');
        return;
      }

      // Create or update shipping info
      const shippingResult = await createShippingInfo(user.$id, {
        ...shippingData,
        email: user.email,
        fullName: shippingData.fullName || user.name,
        phoneNumber: shippingData.phoneNumber
      });

      // Sync cart for the user
      await syncUserCart(user.$id, cartItems.items);

      // Clear local cart after successful sync
      // localStorage.removeItem('cart');

      // Redirect to order confirmation or next step
      router.push('/payment');
    } catch (error) {
      console.error('Shipping submission error:', error);
      // Handle error (show error message to user)
    }
  };

  if (showAuthModal) {
    return (
      <AuthModal 
        onAuthSuccess={handleAuthSuccess}
        initialEmail=""
        initialFullName=""
      />
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("cartItems", cartItems);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <ShippingForm 
            onSubmit={handleShippingSubmit} 
            initialData={{
              email: user.email,
              fullName: user.name,
              userDetails: userDetails
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
