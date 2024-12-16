const nodemailer = require('nodemailer');
const logger = require('../logger');

// Create a transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    from: process.env.SMTP_USER
  });
};

// Send Order Confirmation Email
const sendOrderConfirmationEmail = async (orderDetails) => {
  try {
    // Validate and sanitize input
    if (!orderDetails) {
      throw new Error('No order details provided');
    }

    const { 
      email, 
      id = 'N/A', 
      total = 0, 
      status = 'Pending', 
      items = [], 
      shippingAddress = {},
      userId = 'Unknown'
    } = orderDetails;

    if (!email) {
      throw new Error('No email address provided');
    }

    // Transform order items safely
    const transformedItems = items.map(item => ({
      name: item.productId || item.name || 'Unknown Product',
      quantity: item.quantity || 1,
      price: item.price || 0
    }));

    logger.info(`Preparing order confirmation email for ${email}`, {
      orderId: id,
      totalItems: transformedItems.length
    });

    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Mighty Grains',
        address: process.env.SMTP_USER
      },
      to: email,
      cc: process.env.SMTP_USER, // CC yourself
      subject: `Mighty Grains - Order Confirmation`,
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
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .email-header {
            background-color: #2ecc71;
            color: white;
            text-align: center;
            padding: 20px;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
          }
          .order-details {
            background-color: #f9f9f9;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 20px;
          }
          .order-items {
            border-top: 1px solid #e0e0e0;
            padding-top: 15px;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f0f0f0;
          }
          .item-row:last-child {
            border-bottom: none;
          }
          .order-cta {
            text-align: center;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .order-button {
            display: inline-block;
            background-color: #2ecc71;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }
          .order-button:hover {
            background-color: #27ae60;
          }
          .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
            padding: 10px;
            background-color: #f4f4f4;
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
              <p><strong>Order Number:</strong> ${id}</p>
              <p><strong>Total Amount:</strong> ₹${total.toFixed(2)}</p>
              <p><strong>Status:</strong> ${status}</p>
              <p><strong>User ID:</strong> ${userId}</p>
            </div>
            
            <div class="order-items">
              <h3>Items Purchased</h3>
              ${transformedItems.map(item => `
                <div class="item-row">
                  <div>${item.name}</div>
                  <div>Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
                </div>
              `).join('') || '<p>No items found</p>'}
            </div>

            <div class="order-cta">
              <a target="_blank" href="https://www.mightygrains.in/orders/${id}" class="order-button">
                View Order Details
              </a>
            </div>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} Mighty Grains. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    logger.info('Email sent details:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    });
    
    return { 
      success: true, 
      messageId: info.messageId 
    };
  } catch (error) {
    logger.error('Error sending order confirmation email:', {
      message: error.message,
      stack: error.stack,
      orderDetails
    });
    
    throw error;
  }
};

// Send Password Reset Email
const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Mighty Grains',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: 'Password Reset - Mighty Grains',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - Mighty Grains</title>
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
              text-align: center;
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
            .footer {
              text-align: center;
              color: #888;
              padding: 20px;
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Password Reset</h1>
            </div>
            
            <div class="email-body">
              <p>You have requested to reset your password. Click the button below to proceed:</p>
              <a href="${resetLink}" class="cta-button">Reset Password</a>
              <p>If you did not request a password reset, please ignore this email or contact support.</p>
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

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send password reset email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

// Generic Email Sending Function
const sendGenericEmail = async (email, subject, text, html) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Mighty Grains',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: subject,
      text: text,
      html: html || `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
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
            .footer {
              text-align: center;
              color: #888;
              padding: 20px;
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>${subject}</h1>
            </div>
            
            <div class="email-body">
              ${text || 'No additional content'}
            </div>
            
            <div class="footer">
              <p> 2024 Mighty Grains. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Generic email sent to ${email}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send generic email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendPasswordResetEmail,
  sendGenericEmail
};
