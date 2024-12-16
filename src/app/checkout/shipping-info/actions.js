'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import User from '@/models/user';
import { getUserByAppwriteId, createUserInDatabase } from '@/app/actions';
import { validatePincode } from '@/utils/pincode';

export async function createShippingInfo(appwriteId, shippingData) {
  try {
    // Validate pincode
    const pincodeValidation = await validatePincode(shippingData.pincode);
    
    // Connect to database
    await connectDB();

    // Find or create user
    let user = await getUserByAppwriteId(appwriteId);
    if (!user) {
      try {
        user = await createUserInDatabase({
          appwriteId,
          email: shippingData.email || null,
          fullName: shippingData.fullName || null
        });
      } catch (createError) {
        console.error('Failed to create user during shipping info:', createError);
        throw new Error(`User creation failed: ${createError.message}`);
      }
    }

    // Create shipping info with withInBangalore flag
    const shippingInfo = {
      ...shippingData,
      withInBangalore: pincodeValidation.isWithinBangalore || false
    };

    // Update user with shipping information
    const updatedUser = await User.findByIdAndUpdate(
      user._id, 
      {
        $set: {
          defaultShippingAddress: {
            fullName: shippingInfo.fullName,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            pincode: shippingInfo.pincode,
            phone: shippingInfo.phone,
            withInBangalore: shippingInfo.withInBangalore
          },
          email: shippingInfo.email || user.email,
          fullName: shippingInfo.fullName || user.fullName
        }
      }, 
      { new: true, runValidators: true }
    );

    // Revalidate path
    revalidatePath('/checkout/shipping-info');

    // Return validation info along with shipping data
    return {
      success: true,
      user: {
        _id: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        defaultShippingAddress: updatedUser.defaultShippingAddress
      },
      pincodeValidation
    };
  } catch (error) {
    console.error('Create shipping info error:', error);
    throw error;
  }
}

export async function getShippingInfo(appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Find user
    const user = await getUserByAppwriteId(appwriteId);
    
    // If no user, return null
    if (!user) {
      return null;
    }

    // Return shipping address
    return user.defaultShippingAddress || null;
  } catch (error) {
    console.error('Get shipping info error:', error);
    throw error;
  }
}
