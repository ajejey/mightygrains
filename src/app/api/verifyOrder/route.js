import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/order";
import Cart from "@/models/cart";

const generateSignature = (razorpayOrderId, razorpayPaymentId) => {
    const keySecret = process.env.RAZORPAY_LIVE_KEY_SECRET;
    return crypto
        .createHmac("sha256", keySecret)
        .update(razorpayOrderId + "|" + razorpayPaymentId)
        .digest("hex");
};

export async function POST(request) {
    try {
        await connectDB();
        const { orderId, razorpayPaymentId, razorpaySignature, userId } = await request.json();

        console.log("REQUEST IN VERIFY ORDER API", { orderId, razorpayPaymentId, razorpaySignature, userId });

        const signature = generateSignature(orderId, razorpayPaymentId);
        if (signature !== razorpaySignature) {
            return NextResponse.json(
                { message: "Payment verification failed", isOk: false },
                { status: 400 }
            );
        }

        console.log("SIGNATURE IN VERIFY ORDER API", signature);

        // Update order status
        await Order.findOneAndUpdate(
            { razorpayOrderId: orderId },
            { 
                status: 'paid',
                razorpayPaymentId
            }
        );

        console.log("ORDER UPDATED IN VERIFY ORDER API");

        // Clear user's cart after successful payment
        await Cart.findOneAndDelete({ userId });

        console.log("CART CLEARED IN VERIFY ORDER API");

        return NextResponse.json(
            { message: "Payment verified successfully", isOk: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { message: "Payment verification failed", isOk: false },
            { status: 500 }
        );
    }
}