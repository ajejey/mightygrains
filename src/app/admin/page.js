import { Suspense } from 'react';
import Order from '@/models/order';
// import User from '@/models/user';
import AdminLoading from './loading';
import connectDB from '@/lib/db';
import User from '@/models/user';
import { getAdminStats } from './actions';

async function DashboardStats() {

    const adminStatsData = await getAdminStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-green-900">{adminStatsData.totalUsers}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
        <p className="text-3xl font-bold text-green-900">{adminStatsData.totalOrders}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm mb-2">Pending Orders</h3>
        <p className="text-3xl font-bold text-yellow-600">{adminStatsData.pendingOrders}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm mb-2">Completed Orders</h3>
        <p className="text-3xl font-bold text-green-600">{adminStatsData.completedOrders}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-green-900 mb-6">Dashboard</h1>
      
      <Suspense fallback={<AdminLoading />}>
        <DashboardStats />
      </Suspense>

      {/* Recent Orders Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <p className="text-gray-500">Recent orders section coming soon...</p>
      </section>
    </div>
  );
}