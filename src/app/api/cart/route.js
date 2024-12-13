import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Cart from "@/models/cart";

export async function GET(request) {
    try {
        await connectDB();
        const userId = request.headers.get('userId');
        if (!userId) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        const cart = await Cart.findOne({ userId }).populate('items.product');
        return NextResponse.json(cart || { items: [], total: 0 });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json(
            { error: "Failed to fetch cart" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const { userId, productId, quantity, price } = await request.json();

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [], total: 0 });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price
            });
        }

        cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        await cart.save();

        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json(
            { error: "Failed to update cart" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        await connectDB();
        const { userId, productId } = await request.json();

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return NextResponse.json(
                { error: "Cart not found" },
                { status: 404 }
            );
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        cart.total = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        await cart.save();
        return NextResponse.json(cart);
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return NextResponse.json(
            { error: "Failed to remove item from cart" },
            { status: 500 }
        );
    }
}
