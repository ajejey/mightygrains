'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { account } from '@/appwrite/clientConfig';
import { getUserOrders } from './actions';
import { FaEye, FaShoppingBag } from 'react-icons/fa';
import OrdersLoading from './loading';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const session = await account.get();
        const userOrders = await getUserOrders(session.$id);
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <OrdersLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <FaShoppingBag className="w-24 h-24 text-green-800 mx-auto mb-8" />
        <h1 className="text-3xl font-bold text-green-800 mb-4">No Orders Yet</h1>
        <p className="text-amber-700 mb-8">Start exploring our products and place your first order!</p>
        <Link 
          href="/products" 
          className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-8">Your Orders</h1>

      <div className="space-y-4">
      {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
            <div>
              <p className="font-medium text-green-800">Order #{order._id.slice(-8)}</p>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-amber-600">
                Total: ₹{order.total.toFixed(2)}
              </p>
              <span 
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                  ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}`}
              >
                {order.status}
              </span>
            </div>
            <Link 
              href={`/orders/${order._id}`} 
              className="text-green-600 hover:text-green-800 flex items-center"
            >
              <FaEye className="mr-2" /> View Details
            </Link>
          </div>
      ))}
      </div>
    </div>
  );
}