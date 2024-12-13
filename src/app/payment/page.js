'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentMethod from '@/components/payment/PaymentMethod';
import { account } from '@/appwrite/clientConfig';
import { 
  createOrder, 
  createRazorpayOrder, 
  getUserShippingInfo, 
  verifyRazorpayPayment, 
  sendOrderConfirmationEmailViaService 
} from './actions';
import Script from 'next/script';

export default function PaymentPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [userShippingInfo, setUserShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const session = await account.get();
        const shippingInfo = await getUserShippingInfo(session.$id);
        setUserShippingInfo(shippingInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shipping info:', error);
        // Redirect back to shipping page if no shipping info
        router.push('/checkout');
      }
    };

    // Redirect if cart is empty
    if (cart.items.length === 0) {
      router.push('/cart');
    }

    fetchShippingInfo();
  }, []);

  const handlePayment = async () => {
    try {
      console.log("HANDLE PAYMENT");
      setLoading(true);

      // Get user session
      const session = await account.get();
      console.log("SESSION", session);

      // Create order in backend
      const orderResponse = await createRazorpayOrder({
        amount: totalAmount,
        items: cart.items,
        userId: session.$id,
        shippingAddress: {
          fullName: userShippingInfo.fullName,
          address: userShippingInfo.address,
          city: userShippingInfo.city,
          state: userShippingInfo.state,
          pincode: userShippingInfo.pincode,
          country: userShippingInfo.country,
          phoneNumber: userShippingInfo.phone
        }
      });

      console.log("CREATED RAZORPAY ORDER", orderResponse);

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Mighty Grains',
        description: 'Product Purchase',
        order_id: orderResponse.id,
        handler: async function (response) {
          
            const res = await fetch('/api/verifyOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                userId: session.$id
              })
            });
            
            const data = await res.json();
            console.log("Razorpay handler DATA", data);
            if (data.isOk) {
              console.log('Payment successful!');
            // Create order in database
            const orderDetails = await createOrder({
              userId: session.$id,
              items: cart.items,
              shippingInfo: userShippingInfo,
              paymentDetails: response
            });

            console.log("ORDER DETAILS AFTER PAYMENT SUCCESS", {...orderDetails, email: userShippingInfo.email});

            // Send order confirmation email
            const sendEmail = async (orderDetails) => {
              try {
                console.log('Sending order confirmation email with details:', {
                  orderId: orderDetails.id,
                  email: userShippingInfo.email,
                  totalAmount: orderDetails.total,
                  itemCount: orderDetails.items.length
                });

                const emailResult = await sendOrderConfirmationEmailViaService({
                  ...orderDetails, 
                  email: userShippingInfo.email
                });

                console.log('Email sending result:', {
                  success: emailResult.success,
                  messageId: emailResult.messageId,
                  error: emailResult.error
                });

                if (!emailResult.success) {
                  // Log the error, but don't block the payment process
                  console.error('Failed to send order confirmation email:', emailResult.error);
                }
              } catch (error) {
                console.error('Unexpected error in sending order confirmation email:', error);
              }
            }
           await sendEmail(orderDetails);

            // Clear cart
            clearCart();

            // Redirect to order confirmation
            router.push('/order-confirmation');
          } else {
            // Handle payment verification failure
            console.error('Payment verification failed');
          }
        },
        prefill: {
          name: userShippingInfo.fullName,
          email: session.email,
          contact: userShippingInfo.phone
        },
        theme: {
          color: '#4CAF50'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    // return <LoadingSpinner />;
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <OrderSummary 
          items={cart.items} 
          shippingInfo={userShippingInfo}
          onTotalCalculated={setTotalAmount}
        />
        <PaymentMethod 
          onPaymentMethodChange={setPaymentMethod}
          onPayNow={handlePayment}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}

// Utility functions
function calculateTotalAmount(cartItems) {
  return cartItems.reduce((total, item) => 
    total + (item.product.price.amount * item.quantity), 0
  );
}
