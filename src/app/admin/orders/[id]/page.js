import { getAdminOrder, updateOrderStatus } from '../../actions';
import { notFound } from 'next/navigation';

function OrderStatusBadge({ status }) {
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
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(status)}`}>
            {status.replace('_', ' ').toUpperCase()}
        </span>
    );
}

export default async function OrderDetailsPage({ params }) {
    const order = await getAdminOrder(params.id).catch(() => null);
    
    if (!order) {
        notFound();
    }

    async function handleStatusUpdate(formData) {
        'use server';
        const status = formData.get('status');
        await updateOrderStatus(params.id, status);
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
                <p className="mt-2 text-sm text-gray-700">Order ID: {order._id}</p>
            </div>

            {/* Order Status and Actions */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Status</h2>
                        <div className="mt-2">
                            <OrderStatusBadge status={order.status} />
                        </div>
                    </div>
                    <form action={handleStatusUpdate}>
                        <div className="flex items-center space-x-4">
                            <select 
                                name="status" 
                                defaultValue={order.status}
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                <option value="created">Created</option>
                                <option value="pending_payment">Pending Payment</option>
                                <option value="processing">Processing</option>
                                <option value="delivered">Delivered</option>
                            </select>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Status
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="mt-1">{order.user.fullName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="mt-1">{order.user.email}</p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Items</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {item.productId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                        ₹{item.price.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                        ₹{(item.quantity * item.price).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Total</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                                    ₹{order.total.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="mt-1">{order.shippingAddress.fullName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        <p className="mt-1">{order.shippingAddress.phoneNumber}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="mt-1">{order.shippingAddress.address}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">City</p>
                        <p className="mt-1">{order.shippingAddress.city}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">State</p>
                        <p className="mt-1">{order.shippingAddress.state}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Pincode</p>
                        <p className="mt-1">{order.shippingAddress.pincode}</p>
                    </div>
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                        <p className="mt-1 uppercase">{order.paymentMethod}</p>
                    </div>
                    {order.razorpayOrderId && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Razorpay Order ID</p>
                            <p className="mt-1">{order.razorpayOrderId}</p>
                        </div>
                    )}
                    {order.razorpayPaymentId && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Razorpay Payment ID</p>
                            <p className="mt-1">{order.razorpayPaymentId}</p>
                        </div>
                    )}
                    {order.trackingNumber && (
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                            <p className="mt-1">{order.trackingNumber}</p>
                        </div>
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-500">Order Date</p>
                        <p className="mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
