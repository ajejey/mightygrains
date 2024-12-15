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
  const [processingStatus, setProcessingStatus] = useState('');
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
      setLoading(true);
      setProcessingStatus('Initiating payment...');

      // Create Razorpay order
      const session = await account.get();
      const orderResponse = await createRazorpayOrder({
        amount: cart.total,
        items: cart.items,
        userId: session.$id,
        shippingAddress: userShippingInfo
      });

      console.log("CREATED RAZORPAY ORDER", orderResponse);

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
        amount: orderResponse.amount,
        currency: "INR",
        name: "Mighty Grains",
        description: "Purchase from Mighty Grains",
        order_id: orderResponse.id,
        handler: async function (response) {
          let orderStatus = {
            payment: 'pending',
            order: 'pending',
            shipping: 'pending',
            email: 'pending'
          };

          try {
            // Step 1: Verify Payment
            setProcessingStatus('Verifying payment...');
            console.log("PAYMENT DETAILS IN PAYMENT PAGE", response);
            
            const paymentDetails = {
              ...response,
              userId: session.$id
            };
            
            await verifyRazorpayPayment(paymentDetails);
            orderStatus.payment = 'success';

            // Step 2: Create/Update Order in MongoDB
            setProcessingStatus('Processing order...');
            const order = await createOrder({
              userId: session.$id,
              items: cart.items,
              paymentDetails: response,
              shippingInfo: userShippingInfo
            });
            orderStatus.order = 'success';

            // Step 3: Create Shipway Order
            try {
              setProcessingStatus('Creating shipping order...');
              const orderProducts = cart.items.map(item => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price.amount,
                box_length: item.product.box_length,
                box_width: item.product.box_width,
                box_height: item.product.box_height,
                order_weight: item.product.order_weight
              }));
              await createShipwayOrder(order, orderProducts);
              orderStatus.shipping = 'success';
            } catch (shipwayError) {
              console.error('Shipway order creation failed:', shipwayError);
              orderStatus.shipping = 'failed';
            }

            // Step 4: Send Confirmation Email
            try {
              setProcessingStatus('Sending confirmation email...');
              await sendOrderConfirmationEmailViaService({
                id: order._id.toString(),
                email: userShippingInfo.email,
                total: order.total,
                status: order.status,
                userId: session.$id,
                items: cart.items.map(item => ({
                  productId: item.product.id,
                  name: item.product.name,
                  quantity: item.quantity,
                  price: item.product.price.amount
                })),
                shippingAddress: {
                  fullName: userShippingInfo.fullName,
                  address: userShippingInfo.address,
                  city: userShippingInfo.city,
                  state: userShippingInfo.state,
                  pincode: userShippingInfo.pincode,
                  country: userShippingInfo.country || 'India',
                  phoneNumber: userShippingInfo.phone,
                  email: userShippingInfo.email
                }
              });
              orderStatus.email = 'success';
            } catch (emailError) {
              console.error('Email sending failed:', emailError);
              orderStatus.email = 'failed';
            }

            setProcessingStatus('Order confirmed! Redirecting...');
            clearCart();
            
            // Create status query params
            const statusParams = new URLSearchParams({
              orderId: order._id.toString(),
              ...orderStatus
            }).toString();

            // Redirect with status
            setTimeout(() => {
              router.push(`/order-confirmation?${statusParams}`);
            }, 1000);

          } catch (error) {
            console.error('Process error:', error);
            // If payment was successful but other steps failed
            if (orderStatus.payment === 'success') {
              const statusParams = new URLSearchParams({
                ...orderStatus,
                error: error.message
              }).toString();
              router.push(`/order-confirmation?${statusParams}`);
            } else {
              setProcessingStatus('');
              setLoading(false);
              alert('Payment verification failed. Please try again.');
            }
          }
        },
        prefill: {
          name: userShippingInfo.fullName,
          email: userShippingInfo.email,
          contact: userShippingInfo.phone
        },
        theme: {
          color: "#34C759"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setProcessingStatus('');
      setLoading(false);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (loading || processingStatus !== '') {
    return (
      <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-12 h-12 text-primary"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        <div className="mt-8 max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Processing Your Order</h2>
          <p className="text-gray-600 text-lg">
            {processingStatus || 'Finalizing your purchase...'}
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
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
