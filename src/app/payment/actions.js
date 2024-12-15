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
  console.log("PAYMENT DETAILS IN VERIFY RAZORPAY PAYMENT", paymentDetails);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verifyOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: paymentDetails.razorpay_order_id,
        razorpayPaymentId: paymentDetails.razorpay_payment_id,
        razorpaySignature: paymentDetails.razorpay_signature,
        userId: paymentDetails.userId // This will be passed from handlePayment
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Payment verification failed: ${errorText}`);
    }

    const result = await response.json();
    console.log("RESPONSE IN VERIFY RAZORPAY PAYMENT", result);
    return result;
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
          status: 'processing',
          razorpayPaymentId: orderData.paymentDetails.razorpay_payment_id,
          shippingAddress: {
            fullName: orderData.shippingInfo.fullName,
            address: orderData.shippingInfo.address,
            city: orderData.shippingInfo.city,
            state: orderData.shippingInfo.state,
            pincode: orderData.shippingInfo.pincode,
            country: orderData.shippingInfo.country,
            phoneNumber: orderData.shippingInfo.phone,
            email: orderData.shippingInfo.email
          }
        }
      },
      { new: true }
    );

    if (!updatedOrder) {
      throw new Error('Failed to update order');
    }

    // Create Shipway order
    try {
      const shipwayResult = await createShipwayOrder(updatedOrder, orderData.items.map(item => item.product));
      
      // Update order with Shipway tracking info if available
      if (shipwayResult.tracking_number) {
        await Order.findByIdAndUpdate(updatedOrder._id, {
          $set: {
            status: 'confirmed',
            shipwayTrackingNumber: shipwayResult.tracking_number
          }
        });
      }
    } catch (shipwayError) {
      console.error('Shipway order creation failed:', shipwayError);
      // Don't throw error here, as payment is already successful
      // Instead, we can retry Shipway order creation later
    }

    // Convert Mongoose document to plain object
    const orderObject = updatedOrder.toObject ? updatedOrder.toObject() : updatedOrder;

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmailViaService({
        id: orderObject._id.toString(),
        email: orderData.shippingInfo.email,
        total: orderObject.total,
        status: orderObject.status,
        userId: orderData.userId,
        items: transformedItems.map(item => ({
          ...item,
          productId: item.productId.toString()
        })),
        shippingAddress: {
          fullName: orderData.shippingInfo.fullName,
          address: orderData.shippingInfo.address,
          city: orderData.shippingInfo.city,
          state: orderData.shippingInfo.state,
          pincode: orderData.shippingInfo.pincode,
          country: orderData.shippingInfo.country,
          phoneNumber: orderData.shippingInfo.phone,
          email: orderData.shippingInfo.email
        }
      });
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't throw error for email failure
    }

    // Return order as plain object
    return {
      ...orderObject,
      _id: orderObject._id.toString(),
      user: orderObject.user.toString()
    };
  } catch (error) {
    console.error('Error creating order:', error);
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

    // Convert Mongoose document to plain object
    const orderObject = latestOrder.toObject ? latestOrder.toObject() : latestOrder;

    return {
      ...orderObject,
      _id: orderObject._id.toString(),
      user: orderObject.user.toString()
    };
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
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Email service error response:', errorText);
      throw new Error(`Failed to send order confirmation email: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("Email service response:", responseData);
    
    return { 
      success: true, 
      messageId: responseData.messageId 
    };
  } catch (error) {
    console.error('Error sending order confirmation email via service:', error);
    // If we got a messageId, consider it a success despite the JSON parsing error
    if (error instanceof TypeError && error.message.includes('Body has already been read') && response.ok) {
      return { 
        success: true,
        messageId: 'sent' // We know it was sent but couldn't parse the messageId
      };
    }
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
      const errorText =  await response.clone().text();
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

// Helper function to encode Basic Auth token
function getShipwayAuthToken() {
  const token = Buffer.from(`${process.env.SHIPWAY_USERNAME}:${process.env.SHIPWAY_PASSWORD}`).toString('base64');
  return `Basic ${token}`;
}

export async function createShipwayOrder(order, products) {
  try {
    const shipwayOrder = {
      order_id: order._id.toString(),
      products: order.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          product: product.name,
          price: item.price.toString(),
          product_code: item.productId,
          product_quantity: item.quantity.toString(),
          discount: "0",
          tax_rate: "18",
          tax_title: "GST"
        };
      }),
      discount: "0",
      shipping: "0",
      order_total: order.total.toString(),
      gift_card_amt: "0",
      taxes: ((order.total * 18) / 100).toString(),
      payment_type: "P",
      email: order.shippingAddress.email,
      billing_address: order.shippingAddress.address,
      billing_city: order.shippingAddress.city,
      billing_state: order.shippingAddress.state,
      billing_country: "India",
      billing_firstname: order.shippingAddress.fullName.split(' ')[0],
      billing_lastname: order.shippingAddress.fullName.split(' ').slice(1).join(' ') || '',
      billing_phone: order.shippingAddress.phoneNumber,
      billing_zipcode: order.shippingAddress.pincode,
      shipping_address: order.shippingAddress.address,
      shipping_city: order.shippingAddress.city,
      shipping_state: order.shippingAddress.state,
      shipping_country: "India",
      shipping_firstname: order.shippingAddress.fullName.split(' ')[0],
      shipping_lastname: order.shippingAddress.fullName.split(' ').slice(1).join(' ') || '',
      shipping_phone: order.shippingAddress.phoneNumber,
      shipping_zipcode: order.shippingAddress.pincode,
      order_weight: order.items.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + (parseInt(product.order_weight) * item.quantity);
      }, 0).toString(),
      box_length: "30",
      box_breadth: "25",
      box_height: "10",
      order_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    };

    const response = await fetch('https://app.shipway.com/api/v2orders', {
      method: 'POST',
      headers: {
        'Authorization': getShipwayAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shipwayOrder)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Shipway API error: ${error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating Shipway order:', error);
    throw error;
  }
}