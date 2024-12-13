import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            'created', 
            'pending_payment', 
            'payment_failed', 
            'paid', 
            'processing', 
            'shipped', 
            'delivered', 
            'cancelled'
        ],
        default: 'created'
    },
    paymentMethod: {
        type: String,
        enum: ['razorpay', 'upi', 'cod'],
        required: true
    },
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
        phoneNumber: String
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    trackingNumber: String,
}, {
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
