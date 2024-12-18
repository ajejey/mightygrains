'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { account } from '@/appwrite/clientConfig';
import { getOrderDetails } from './actions';
import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import OrderDetailsLoading from './loading';
import sattuMaavuPack from '../../assets/images/sattu-maavu-grains.png'
import ragiHurihittu from '../../assets/images/ragi-hurihittu.png'
import ragiSeriFrontPack from '../../assets/images/sprouted-ragi-seri.png'
import RagiSeriAlmondsFrontPack from '../../assets/images/sprouted-ragi-seri-almonds.png'

const productImageMap = {
    'sattu-maavu-grains': sattuMaavuPack,
    'ragi-hurihittu': ragiHurihittu,
    'sprouted-ragi-seri-porridge': ragiSeriFrontPack,
    'sprouted-ragi-almonds-porridge': RagiSeriAlmondsFrontPack,
}

export default function OrderDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {                    
            try {               
            const session = await account.get();
                const order = await getOrderDetails(params.id, session.$id);
                setOrderDetails(order);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [params.id]);

    if (loading) {
        return <OrderDetailsLoading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    console.log("ORDER DETAILS", orderDetails);

    return (
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-green-800">
                    Order #{orderDetails._id.slice(-8)}
                </h1>
                <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit
                        ${orderDetails.status === 'paid' ? 'bg-green-100 text-green-800' :
                        orderDetails.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}
                >
                    {orderDetails.status}
                </span>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                            <FaShoppingBag className="text-green-600" /> Order Details
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-gray-600">Placed on {new Date(orderDetails.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                            <p className="text-green-700 font-medium">Total: ₹{orderDetails.total.toFixed(2)}</p>
                            <p className="text-gray-600">Payment: {orderDetails.paymentMethod}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                            <FaMapMarkerAlt className="text-green-600" /> Shipping Address
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>
                            <p className="text-gray-600">{orderDetails.shippingAddress.address}</p>
                            <p className="text-gray-600">
                                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                            </p>
                            <p className="text-gray-600">Phone: {orderDetails.shippingAddress.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-600 flex items-center gap-2 text-sm sm:text-base">
                            <FaCreditCard className="text-green-600" /> Payment Information
                        </h3>
                        <div className="space-y-1 text-sm">
                            <p className="text-gray-600 break-all">Order ID: {orderDetails.razorpayOrderId}</p>
                            <p className="text-gray-600 break-all">Payment ID: {orderDetails.razorpayPaymentId}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-4">Order Items</h2>
                <div className="divide-y">
                    {orderDetails.items.map((item, index) => (
                        <div
                            key={index}
                            className="py-4 flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                            {item.productDetails?.images && item.productDetails.images.length > 0 && (

                                <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0">
                                    <Image
                                        src={productImageMap[item.productId]}
                                        alt={item.productDetails.name}
                                        width={96}
                                        height={96}
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 flex-grow">
                                <div>
                                    <h3 className="font-medium text-green-800 text-sm sm:text-base">
                                        {item.productDetails?.name || item.productId}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="font-medium text-green-800 text-sm sm:text-base">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div className="flex gap-3 text-sm">
                        <Link
                            href="/orders"
                            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors gap-2"
                        >
                            Back to Orders
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors gap-2"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                    <div className="text-right font-bold text-lg sm:text-xl text-green-800">
                        Total: ₹{orderDetails.total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}