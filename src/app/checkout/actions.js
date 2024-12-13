'use server';
import { revalidatePath } from 'next/cache';
import Cart from '@/models/cart';
import User from '@/models/user';
import { getUserByAppwriteId, createUserInDatabase } from '@/app/actions';
import connectDB from '@/lib/db';

export async function syncUserCart(appwriteId, cartItems) {
    // Validate inputs
    if (!appwriteId || !cartItems) {
        console.error('Invalid inputs for cart sync');
        return null;
    }

    // Connect to database
    await connectDB();

    // Ensure user exists
    let user = await getUserByAppwriteId(appwriteId);
    console.log('Syncing cart for user:', user);
    if (!user) {
      // Try to create user if not exists
      try {
        user = await createUserInDatabase({ 
          appwriteId, 
          email: null, 
          fullName: null 
        });
      } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Unable to sync cart: User creation failed');
      }
    }

    // Find existing cart for user or create new
    let userCart = await Cart.findOne({ user: user._id });

    console.log('Existing userCart:', userCart);

    // If no cart exists, create a new one
    if (!userCart) {
        userCart = new Cart({
            user: user._id,
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price.amount
            })),
            total: cartItems.reduce((total, item) => 
                total + (item.quantity * item.product.price.amount), 0)
        });

        console.log('Creating new cart:', userCart);
        await userCart.save();
        
        // Convert to plain object
        return userCart.toObject();
    }

    // Update existing cart
    userCart.items = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price.amount
    }));

    // Recalculate total
    userCart.total = cartItems.reduce((total, item) => 
        total + (item.quantity * item.product.price.amount), 0);

    console.log('Updating existing cart:', userCart);
    await userCart.save();
    
    // Convert to plain object
    return userCart.toObject();
}

export async function getCartForUser(appwriteId) {
    // Connect to database
    await connectDB();

    // Find user
    const user = await getUserByAppwriteId(appwriteId);
    
    if (!user) {
        return [];
    }

    // Find cart for user
    const cart = await Cart.findOne({ user: user._id });
    
    if (!cart) {
        return [];
    }

    // Convert to plain object and return items
    return cart.toObject().items;
}

export async function clearUserCart(appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Ensure user exists
    const user = await getUserByAppwriteId(appwriteId);
    if (!user) {
      // Try to create user if not exists
      try {
        await createUserInDatabase({ 
          appwriteId, 
          email: null, 
          fullName: null 
        });
      } catch (createError) {
        console.error('Failed to create user during cart clear:', createError);
        throw new Error(`User creation failed: ${createError.message}`);
      }
    }

    // Remove cart for user
    await Cart.findOneAndDelete({ user: user._id });

    // Revalidate path
    revalidatePath('/checkout');

    return { success: true };
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
}
