import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: false
    },
    fullDescription: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    images: [{
        type: String
    }],
    category: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: false,
        default: 0
    },
    ingredients: [{
        type: String
    }],
    nutritionalFacts: {
        calories: {
            type: Number,
            required: false
        },
        protein: {
            type: String,
            required: false
        },
        carbs: {
            type: String,
            required: false
        },
        fat: {
            type: String,
            required: false
        },
        fiber: {
            type: String,
            required: false
        }
    },
    benefits: [{
        type: String
    }]
}, {
    timestamps: true
});

// Create indexes for frequently queried fields
productSchema.index({ id: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', shortDescription: 'text', fullDescription: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
