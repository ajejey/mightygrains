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
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16 text-center">
        <FaShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-green-800 mx-auto mb-6 sm:mb-8 opacity-90" />
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-3 sm:mb-4">No Orders Yet</h1>
        <p className="text-amber-700 mb-6 sm:mb-8 text-sm sm:text-base">Start exploring our products and place your first order!</p>
        <Link 
          href="/products" 
          className="inline-block bg-amber-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-amber-600 transition-colors text-sm sm:text-base shadow-sm hover:shadow-md"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6 sm:mb-8">Your Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div 
            key={order._id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <p className="font-medium text-green-800 text-lg">
                    Order #{order._id.slice(-8)}
                  </p>
                  <span 
                    className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit
                      ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-sm text-gray-600">
                  <p>
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-amber-600 font-medium">
                    Total: ₹{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link 
                href={`/orders/${order._id}`} 
                className="flex items-center justify-center px-4 py-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors text-sm sm:text-base gap-2 border border-green-200"
              >
                <FaEye /> View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}