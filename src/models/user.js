import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Unique identifier from Appwrite
    appwriteId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
        default: null
    },
    fullName: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    profileImage: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        default: null,
        trim: true
    },
    defaultShippingAddress: {
        fullName: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        phone: String,
        withInBangalore: Boolean
    },
    preferences: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    roles: {
        type: [String],
        enum: ['user', 'admin', 'vendor'],
        default: ['user']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for total number of orders
userSchema.virtual('totalOrders').get(function() {
    return this.orders ? this.orders.length : 0;
});

// Middleware to update last login
userSchema.methods.updateLastLogin = function() {
    this.lastLogin = new Date();
    return this.save();
};

// Ensure the model is only created once
export default mongoose.models.User || mongoose.model('User', userSchema);
