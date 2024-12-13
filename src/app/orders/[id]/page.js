'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { account } from '@/appwrite/clientConfig';
import { getOrderDetails } from './actions';
import { FaShoppingBag, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import OrderDetailsLoading from './loading';

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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-green-800">
                    Order #{orderDetails._id.slice(-8)}
                </h1>
                <span
                    className={`px-4 py-2 rounded-full text-sm font-medium 
            ${orderDetails.status === 'paid' ? 'bg-green-100 text-green-800' :
                            orderDetails.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'}`}
                >
                    {orderDetails.status}
                </span>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <h3 className="font-semibold text-gray-600 flex items-center">
                            <FaShoppingBag className="mr-2" /> Order Details
                        </h3>
                        <p>Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        <p>Total: ₹{orderDetails.total.toFixed(2)}</p>
                        <p>Payment Method: {orderDetails.paymentMethod}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-600 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Shipping Address
                        </h3>
                        <p>{orderDetails.shippingAddress.fullName}</p>
                        <p>{orderDetails.shippingAddress.address}</p>
                        <p>
                            {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}
                        </p>
                        <p>Phone: {orderDetails.shippingAddress.phoneNumber}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-600 flex items-center">
                            <FaCreditCard className="mr-2" /> Payment Information
                        </h3>
                        <p>Razorpay Order ID: {orderDetails.razorpayOrderId}</p>
                        <p>Payment ID: {orderDetails.razorpayPaymentId}</p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Order Items</h2>
                {orderDetails.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center border-b py-4 last:border-b-0"
                    >
                        {item.productDetails?.images && item.productDetails.images.length > 0 && (
                            <div className="w-24 h-24 relative mr-4">
                                {console.log('Original Image Path:', item.productDetails.images[0])}
                                {console.log('Filename:', item.productDetails.images[0].split('/').pop())}

                                <Image
                                    src={`/public/images/${item.productDetails.images[0].split('/').pop().replace('-removebg', '')}`}
                                    alt={item.productDetails.name}
                                    width={96}
                                    height={96}
                                    onError={(e) => {
                                        console.error('Image load error:', e);
                                        console.error('Attempted to load image:', e.target.src);
                                    }}
                                    className="object-cover rounded"
                                />
                            </div>
                        )}
                        <div className="flex-grow">
                            <h3 className="font-medium text-green-800">
                                {item.productDetails?.name || item.productId}
                            </h3>
                            <p className="text-gray-600">
                                Quantity: {item.quantity} | Price: ₹{item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="font-medium text-green-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
                <div className="text-right mt-4 font-bold text-xl text-green-800">
                    Total: ₹{orderDetails.total.toFixed(2)}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <Link
                    href="/orders"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Back to Orders
                </Link>
                <Link
                    href="/"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}