'use server';

import connectDB from "@/lib/db";
import Product from "@/models/product";

export async function getProductById(id) {
    try {
        await connectDB();
        const product = await Product.findOne({ id });
        return product ? JSON.parse(JSON.stringify(product)) : null;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function getAllProducts() {
    try {
        await connectDB();
        const products = await Product.find({});
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}