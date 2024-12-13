import { getAdminOrders } from '../actions';
import { Suspense } from 'react';
import Link from 'next/link';

const OrderStatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'created':
                return 'bg-blue-100 text-blue-800';
            case 'pending_payment':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
            {status.replace('_', ' ').toUpperCase()}
        </span>
    );
};

async function OrdersTable({ page = 1, status = null }) {
    const { orders, totalPages, currentPage } = await getAdminOrders(page, 10, status);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <Link href={`/admin/orders/${order._id}`} className="hover:text-indigo-600">
                                    {order._id}
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {order.user?.fullName || 'N/A'}
                                <div className="text-xs text-gray-400">{order.user?.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Link 
                                    href={`/admin/orders/${order._id}`}
                                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center space-x-1"
                                >
                                    <span>View Details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Link
                        href={`/admin/orders?page=${currentPage - 1}${status ? `&status=${status}` : ''}`}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </Link>
                    <Link
                        href={`/admin/orders?page=${currentPage + 1}${status ? `&status=${status}` : ''}`}
                        className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                    </Link>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing page <span className="font-medium">{currentPage}</span> of{' '}
                            <span className="font-medium">{totalPages}</span>
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Link
                                key={pageNum}
                                href={`/admin/orders?page=${pageNum}${status ? `&status=${status}` : ''}`}
                                className={`px-3 py-1 text-sm border rounded-md ${
                                    pageNum === currentPage
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {pageNum}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default async function AdminOrdersPage({ searchParams }) {
    const page = Number(searchParams?.page) || 1;
    const status = searchParams?.status || null;

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Orders Management</h1>
                <p className="mt-2 text-sm text-gray-700">Manage and track all orders in the system</p>
            </div>

            <div className="mb-6 flex space-x-2">
                <Link 
                    href="/admin/orders"
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        !status ? 'bg-indigo-600 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    All Orders
                </Link>
                <Link 
                    href="/admin/orders?status=pending_payment"
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        status === 'pending_payment' ? 'bg-indigo-600 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    Pending
                </Link>
                <Link 
                    href="/admin/orders?status=processing"
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        status === 'processing' ? 'bg-indigo-600 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    Processing
                </Link>
                <Link 
                    href="/admin/orders?status=delivered"
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        status === 'delivered' ? 'bg-indigo-600 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    Delivered
                </Link>
            </div>

            <Suspense fallback={<div>Loading orders...</div>}>
                <OrdersTable page={page} status={status} />
            </Suspense>
        </div>
    );
}