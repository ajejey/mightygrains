'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import User from '@/models/user';
import { getUserByAppwriteId, createUserInDatabase } from '@/app/actions';
import { validatePincode } from '@/utils/pincode';

// Add cache for pincode validation results
const PINCODE_CACHE = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function createShippingInfo(appwriteId, shippingData) {
  if (!appwriteId || !shippingData) {
    throw new Error('Missing required parameters');
  }

  try {
    // Run pincode validation and DB connection in parallel
    const [pincodeValidation, dbConnection] = await Promise.all([
      getPincodeValidation(shippingData.pincode),
      connectDB()
    ]);

    // Find user and update in a single operation
    const updatedUser = await User.findOneAndUpdate(
      { appwriteId },
      {
        $set: {
          defaultShippingAddress: {
            fullName: shippingData.fullName,
            address: shippingData.address,
            city: shippingData.city,
            state: shippingData.state,
            pincode: shippingData.pincode,
            phone: shippingData.phone,
            withInBangalore: pincodeValidation.isWithinBangalore
          },
          email: shippingData.email,
          fullName: shippingData.fullName,
          appwriteId // Ensure appwriteId is set
        }
      },
      { 
        new: true, 
        runValidators: true,
        upsert: true, // Create if doesn't exist
        setDefaultsOnInsert: true 
      }
    );

    // Revalidate path in the background
    revalidatePath('/checkout/shipping-info');

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
    throw new Error(error.message || 'Failed to create shipping info');
  }
}

// Separate function for pincode validation with caching
async function getPincodeValidation(pincode) {
  // Check cache first
  const cachedResult = PINCODE_CACHE.get(pincode);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.data;
  }

  // If not in cache, validate and cache the result
  const validation = await validatePincode(pincode);
  PINCODE_CACHE.set(pincode, {
    data: validation,
    timestamp: Date.now()
  });

  return validation;
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
