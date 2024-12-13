'use server';

import { getUserByAppwriteId } from '@/app/actions';
import connectDB from '@/lib/db';
import User from '@/models/user';
import Order from '@/models/order';

export async function getUserShippingInfo(appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Find user by Appwrite ID
    const user = await User.findOne({ appwriteId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Return shipping information as a plain object
    return user.defaultShippingAddress ? {
      fullName: user.defaultShippingAddress.fullName || '',
      address: user.defaultShippingAddress.address || '',
      city: user.defaultShippingAddress.city || '',
      state: user.defaultShippingAddress.state || '',
      pincode: user.defaultShippingAddress.pincode || '',
      phone: user.defaultShippingAddress.phone || '',
      country: user.defaultShippingAddress.country || 'India',
      email: user.email
    } : null;
  } catch (error) {
    console.error('Error fetching user shipping info:', error);
    throw new Error(`Failed to retrieve shipping information: ${error.message}`);
  }
}

export async function createRazorpayOrder({ amount, items, userId, shippingAddress }) {
  try {
    // Transform cart items to match order schema
    const transformedItems = items.map(cartItem => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
      price: cartItem.product.price.amount
    }));

    // Integrate Razorpay order creation logic here
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount, 
        items: transformedItems, 
        userId, 
        shippingAddress 
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create Razorpay order: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

export async function verifyRazorpayPayment(paymentDetails) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Payment verification failed: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
}

export async function createOrder(orderData) {
  try {
    // Connect to database
    await connectDB();

    // Find user to get the MongoDB user ID
    const user = await User.findOne({ appwriteId: orderData.userId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Validate cart items
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('No items in the order');
    }

    // Transform cart items to match order schema
    const transformedItems = orderData.items.map(cartItem => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
      price: cartItem.product.price.amount
    }));

    // Calculate total amount from items
    const total = transformedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Find and update the existing order
    const updatedOrder = await Order.findOneAndUpdate(
      { 
        user: user._id, 
        razorpayOrderId: orderData.paymentDetails.razorpay_order_id 
      },
      {
        $set: {
          items: transformedItems,
          total: total,
          status: 'paid',
          razorpayPaymentId: orderData.paymentDetails.razorpay_payment_id,
          shippingAddress: {
            fullName: orderData.shippingInfo.fullName,
            address: orderData.shippingInfo.address,
            city: orderData.shippingInfo.city,
            state: orderData.shippingInfo.state,
            pincode: orderData.shippingInfo.pincode,
            country: orderData.shippingInfo.country,
            phoneNumber: orderData.shippingInfo.phone
          }
        }
      },
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run model validations on update
      }
    );

    if (!updatedOrder) {
      throw new Error('No order found to update');
    }

    // Convert Mongoose document to plain object
    const orderObject = updatedOrder.toObject ? updatedOrder.toObject() : updatedOrder;

    return {
      id: orderObject._id.toString(),
      user: orderObject.user.toString(),
      items: orderObject.items,
      total: orderObject.total,
      status: orderObject.status,
      razorpayOrderId: orderObject.razorpayOrderId,
      razorpayPaymentId: orderObject.razorpayPaymentId,
      shippingAddress: orderObject.shippingAddress
    };
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

export async function getLatestUserOrder(appwriteId) {
    console.log("APPWRITE ID IN GET LATEST ORDER", appwriteId);
  try {
    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ appwriteId });

    console.log("USER IN GET LATEST ORDER", user);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Find the most recent order for the user
    const latestOrder = await Order.findOne({ user: user._id })
      .sort({ createdAt: -1 })

    console.log("LATEST ORDER IN GET LATEST ORDER", latestOrder);

    if (!latestOrder) {
      throw new Error('No orders found');
    }

    return latestOrder.toObject();
  } catch (error) {
    console.error('Error fetching latest order:', error);
    throw new Error(`Failed to retrieve latest order: ${error.message}`);
  }
}

export async function sendOrderConfirmationEmailViaService(orderDetails) {
  try {
    // Ensure all necessary fields are present
    const completeOrderDetails = {
      id: orderDetails.id || 'N/A',
      total: orderDetails.total || 0,
      status: orderDetails.status || 'Pending',
      userId: orderDetails.userId || 'Unknown',
      email: orderDetails.email,
      items: orderDetails.items || [],
      shippingAddress: orderDetails.shippingAddress || {}
    };

    console.log('Sending complete order details:', JSON.stringify(completeOrderDetails, null, 2));

    // Generate JWT token for authentication
    const token = await generateEmailServiceToken();

    // Send email via external email service
    console.log('Sending email to URL:', `${process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL}/api/email/order-confirmation`);
    console.log('Request payload:', JSON.stringify({
      email: completeOrderDetails.email,
      orderDetails: completeOrderDetails
    }, null, 2));

    const response = await fetch(`${process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL}/api/email/order-confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: completeOrderDetails.email,
        orderDetails: completeOrderDetails
      })
    });

    console.log('Email service response status:', response.status);
    const responseText = await response.text();
    console.log('Email service response text:', responseText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email service error response:', errorText);
      throw new Error(`Failed to send order confirmation email: ${errorText}`);
    }

    const result = await response.json();
    console.log("RESPONSE FROM EMAIL SERVICE", result);
    return { 
      success: true, 
      messageId: result.messageId 
    };
  } catch (error) {
    console.error('Error sending order confirmation email via service:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Helper function to generate JWT for email service authentication
async function generateEmailServiceToken() {
  try {
    const payload = {
      service: 'mighty-grains-order-confirmation',
      timestamp: Date.now()
    };

    console.log('Generating email service token with payload:', payload);
    console.log('Using EMAIL_SERVICE_JWT_SECRET:', 
      process.env.EMAIL_SERVICE_JWT_SECRET ? 'Secret is set' : 'SECRET IS UNDEFINED'
    );

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-email-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token generation failed:', errorText);
      throw new Error(`Failed to generate email service token: ${errorText}`);
    }

    const result = await response.json();
    console.log('Token generation response:', result);

    return result.token;
  } catch (error) {
    console.error('Error generating email service token:', error);
    throw error;
  }
}