'use server';

import connectDB from '@/lib/db';
import Order from '@/models/order';
import User from '@/models/user';
import Product from '@/models/product';

export async function getOrderDetails(orderId, appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ appwriteId });
    
    if (!user) {
      throw new Error('User not found');
    }

    // Find the specific order for the user with product details
    const order = await Order.findOne({ 
      _id: orderId, 
      user: user._id 
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Fetch product details for each item
    const orderWithProducts = await Promise.all(order.items.map(async (item) => {
      const product = await Product.findOne({ id: item.productId });
      return {
        ...item.toObject(),
        productDetails: product ? product.toObject() : null
      };
    }));

    const orderObject = order.toObject();
    orderObject.items = orderWithProducts;

    return orderObject;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error(`Failed to retrieve order details: ${error.message}`);
  }
}