'use server';

import connectDB from '@/lib/db';
import Order from '@/models/order';
import User from '@/models/user';
import Product from '@/models/product';

export async function getUserOrders(appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ appwriteId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Find all orders for the user, sorted by most recent first
    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 });

    // Return orders as plain objects
    return orders.map(order => order.toObject());
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error(`Failed to retrieve orders: ${error.message}`);
  }
}

export async function getOrderDetails(orderId, appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ appwriteId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Find the specific order for the user
    const order = await Order.findOne({ 
      _id: orderId, 
      user: user._id 
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Return order as a plain object
    return order.toObject();
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error(`Failed to retrieve order details: ${error.message}`);
  }
}