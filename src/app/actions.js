'use server';

import User from '@/models/user';
import connectDB from '@/lib/db';
import { testEmail } from '@/lib/emailService';

export async function createUserInDatabase(userData) {
  try {
    // Connect to database
    await connectDB();

    // Validate required fields
    if (!userData.appwriteId) {
      throw new Error('Appwrite ID is required for user creation');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ appwriteId: userData.appwriteId });
    if (existingUser) {
      // Return a plain object representation of the user
      return {
        _id: existingUser._id.toString(),
        appwriteId: existingUser.appwriteId,
        email: existingUser.email,
        fullName: existingUser.fullName,
        isActive: existingUser.isActive
      };
    }

    // Create new user
    const newUser = new User({
      appwriteId: userData.appwriteId,
      email: userData.email || null,
      fullName: userData.fullName || null,
      profileImage: userData.profileImage || null,
      phoneNumber: userData.phoneNumber || null,
      isActive: true
    });

    // Save user to database
    await newUser.save();

    // Return a plain object representation of the user
    return {
      _id: newUser._id.toString(),
      appwriteId: newUser.appwriteId,
      email: newUser.email,
      fullName: newUser.fullName,
      isActive: newUser.isActive
    };
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function getUserByAppwriteId(appwriteId) {
  try {
    // Connect to database
    await connectDB();

    // Validate input
    if (!appwriteId) {
      throw new Error('Appwrite ID is required');
    }

    // Find user by Appwrite ID
    const user = await User.findOne({ appwriteId });
    
    if (!user) {
      console.warn(`No user found with Appwrite ID: ${appwriteId}`);
      return null;
    }

    // Return a plain object representation of the user
    return {
      _id: user._id.toString(),
      appwriteId: user.appwriteId,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      defaultShippingAddress: user.defaultShippingAddress
    };
  } catch (error) {
    console.error('Error finding user:', error);
    throw new Error(`Failed to find user: ${error.message}`);
  }
}

export async function sendTestEmailAction() {
  'use server'
  try {
    const result = await testEmail();
    return {
      success: result.success,
      message: result.success 
        ? 'Test email sent successfully!' 
        : 'Failed to send test email.'
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false, 
      message: 'An unexpected error occurred while sending email.'
    };
  }
}
