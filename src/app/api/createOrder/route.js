// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//     key_id: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID,
//     key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
// });

// export async function POST(request) {
//     const { amount } = await request.json();
//     const order = await razorpay.orders.create({
//         amount,
//         currency: "INR",
//     })

//     return NextResponse.json(order);
// }