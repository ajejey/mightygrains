import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const payload = await request.json();

    // Create a more structured payload
    const tokenPayload = {
      service: 'mighty-grains-email-service',
      timestamp: Date.now(),
      ...payload
    };

    // Use a consistent secret and add more token options
    const token = jwt.sign(
      tokenPayload, 
      process.env.EMAIL_SERVICE_JWT_SECRET || 'fallback_secret', 
      { 
        expiresIn: '15m',
        algorithm: 'HS256'  // Specify the algorithm explicitly
      }
    );

    return NextResponse.json({ 
      token,
      message: 'Token generated successfully'
    });
  } catch (error) {
    console.error('Error generating email token:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate token',
        details: error.message 
      }, 
      { status: 500 }
    );
  }
}
