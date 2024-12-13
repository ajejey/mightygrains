'use server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

/**
 * Send an order confirmation email
 * @param {Object} orderDetails - Details of the order to be emailed
 * @returns {Promise<Object>} - Result of email sending
 */
export async function sendOrderConfirmationEmail(orderDetails) {
  try {
    // Validate required fields
    if (!orderDetails || !orderDetails.email) {
      throw new Error('Invalid order details: Missing customer email');
    }

    // Transform order items to match the previous structure
    const transformedItems = orderDetails.items.map(item => ({
      name: item.productId, // Using productId as name, you might want to fetch actual product name
      quantity: item.quantity,
      price: item.price
    }));

    console.log(`Sending order confirmation email:
      To: ${orderDetails.email}
      CC: ${process.env.EMAIL_USER}
      Order ID: ${orderDetails.id}`);

    const mailOptions = {
      from: {
        name: 'Mighty Grains',
        address: process.env.EMAIL_USER
      },
      to: orderDetails.email,
      cc: process.env.EMAIL_USER, // CC yourself
      subject: `Order Confirmation - Order #${orderDetails.id || 'N/A'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation - Mighty Grains</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
              line-height: 1.6;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 30px;
            }
            .order-details {
              background-color: #f9f9f9;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .shipping-details {
              background-color: #f0f0f0;
              border-radius: 8px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .order-items {
              border-top: 1px solid #e0e0e0;
              padding-top: 20px;
            }
            .item-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid #f0f0f0;
            }
            .footer {
              text-align: center;
              color: #888;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .cta-button {
              display: inline-block;
              background-color: #4CAF50;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Order Confirmation</h1>
              <p>Thank you for your purchase from Mighty Grains!</p>
            </div>
            
            <div class="email-body">
              <div class="order-details">
                <h2>Order Summary</h2>
                <p><strong>Order Number:</strong> ${orderDetails.id || 'N/A'}</p>
                <p><strong>Total Amount:</strong> ₹${orderDetails.total ? orderDetails.total.toFixed(2) : 'N/A'}</p>
                <p><strong>Payment Status:</strong> ${orderDetails.status || 'Pending'}</p>
              </div>
              
              <div class="shipping-details">
                <h2>Shipping Information</h2>
                <p><strong>Name:</strong> ${orderDetails.shippingAddress?.fullName || 'N/A'}</p>
                <p><strong>Address:</strong> ${orderDetails.shippingAddress?.address || 'N/A'}</p>
                <p><strong>City:</strong> ${orderDetails.shippingAddress?.city || 'N/A'}</p>
                <p><strong>State:</strong> ${orderDetails.shippingAddress?.state || 'N/A'}</p>
                <p><strong>Pincode:</strong> ${orderDetails.shippingAddress?.pincode || 'N/A'}</p>
                <p><strong>Phone:</strong> ${orderDetails.shippingAddress?.phoneNumber || 'N/A'}</p>
              </div>
              
              <div class="order-items">
                <h3>Items Purchased</h3>
                ${transformedItems ? transformedItems.map(item => `
                  <div class="item-row">
                    <span>${item.name || 'Unknown Item'}</span>
                    <span>Qty: ${item.quantity || 1} × $${item.price ? item.price.toFixed(2) : 'N/A'}</span>
                  </div>
                `).join('') : '<p>No items found</p>'}
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/orders/${orderDetails.id}" class="cta-button">View Order Details</a>
            </div>
            
            <div class="footer">
              <p> 2024 Mighty Grains. All rights reserved.</p>
              <p>Questions? Contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent details:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

export async function testEmail() {
  const testOrderDetails = {
    id: 'TEST-' + Math.random().toString(36).substr(2, 9),
    email: process.env.EMAIL_USER, // Send test email to yourself
    total: 49.99,
    status: 'paid',
    items: [
      {
        productId: 'Test Product',
        quantity: 2,
        price: 24.99
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

  console.log('Sending test email...');
  const result = await sendOrderConfirmationEmail(testOrderDetails);
  console.log('Test email result:', result);
  return result;
}
