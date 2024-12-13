'use server';

import connectDB from '@/lib/db';
import Order from '@/models/order';
import User from '@/models/user';

export async function checkAdminStatus(appwriteId) {
  try {
    await connectDB();
    const user = await User.findOne({ appwriteId });
    return user && user.roles.includes('admin');
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

export async function getAdminStats() {
  try {
    await connectDB();

    const [
      totalUsers,
      totalOrders,
      pendingOrders,
      completedOrders
    ] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['created', 'pending_payment', 'processing'] } }),
      Order.countDocuments({ status: 'delivered' })
    ]);

    return {
      totalUsers,
      totalOrders,
      pendingOrders,
      completedOrders
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
}

export async function getAdminUsers(page = 1, limit = 10) {
  try {
    await connectDB();

    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    return {
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching admin users:', error);
    throw error;
  }
}

export async function getAdminOrders(page = 1, limit = 10, status = null) {
  try {
    await connectDB();

    const skip = (page - 1) * limit;
    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(query);

    return {
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page
    };
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    throw error;
  }
}

export async function getAdminOrder(orderId) {
  try {
    await connectDB();

    const order = await Order.findById(orderId)
      .populate('user', 'fullName email');

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Error fetching admin order:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    await connectDB();

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('user', 'fullName email');

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}
