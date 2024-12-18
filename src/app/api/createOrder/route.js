import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import User from "@/models/user";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY_ID,
    key_secret: process.env.RAZORPAY_LIVE_KEY_SECRET,
});

export async function POST(request) {
    try {
        await connectDB();
        const { amount, items, userId, shippingAddress } = await request.json();
        console.log("ORDER DATA IN CREATE ORDER API", { amount, items, userId, shippingAddress });

        // Find user by Appwrite ID to get MongoDB user ID
        const user = await User.findOne({ appwriteId: userId });
        
        if (!user) {
            return NextResponse.json({ 
                error: 'User not found' 
            }, { status: 404 });
        }

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
        });

        console.log("RAZORPAY ORDER IN CREATE ORDER API", razorpayOrder);

        // Create order in database
        const order = await Order.create({
            user: user._id,  // Use MongoDB user _id
            items,
            total: amount,
            shippingAddress,
            razorpayOrderId: razorpayOrder.id,
            status: 'pending_payment',
            paymentMethod: 'razorpay'
        });

        return NextResponse.json({
            id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            orderId: order._id
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order', details: error.message },
            { status: 500 }
        );
    }
}