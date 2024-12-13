require('dotenv').config();
const { 
  sendOrderConfirmationEmail, 
  sendPasswordResetEmail,
  sendGenericEmail 
} = require('./services/emailService');

async function testEmails() {
  try {
    // Test Order Confirmation Email
    const orderDetails = {
      id: 'TEST-' + Math.random().toString(36).substr(2, 9),
      email: process.env.SMTP_USER, // Send test email to yourself
      total: 49.99,
      status: 'paid',
      items: [
        {
          productId: 'Organic Wheat Flour',
          quantity: 2,
          price: 24.99
        },
        {
          productId: 'Organic Rice',
          quantity: 1,
          price: 15.00
        }
      ],
      shippingAddress: {
        fullName: 'Test User',
        address: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        pincode: '12345',
        phoneNumber: '1234567890'
      }
    };

    console.log('Sending Order Confirmation Email...');
    const orderEmailResult = await sendOrderConfirmationEmail(orderDetails);
    console.log('Order Confirmation Email Result:', orderEmailResult);

    // Test Password Reset Email
    console.log('Sending Password Reset Email...');
    const passwordResetResult = await sendPasswordResetEmail(
      process.env.SMTP_USER, 
      'https://mightygrains.com/reset-password?token=test123'
    );
    console.log('Password Reset Email Result:', passwordResetResult);

    // Test Generic Email
    console.log('Sending Generic Email...');
    const genericEmailResult = await sendGenericEmail(
      process.env.SMTP_USER, 
      'Test Generic Email', 
      'This is a test generic email from Mighty Grains Email Service.',
      null
    );
    console.log('Generic Email Result:', genericEmailResult);

  } catch (error) {
    console.error('Email Testing Error:', error);
  }
}

testEmails();
