const express = require('express');
const router = express.Router();
const { 
  sendOrderConfirmationEmail, 
  sendPasswordResetEmail,
  sendGenericEmail 
} = require('../services/emailService');
const logger = require('../logger');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('No token provided in request');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Token verification failed', { 
      error: error.message, 
      token: token.substring(0, 10) + '...' 
    });
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Order Confirmation Email Route
router.post('/order-confirmation', verifyToken, async (req, res) => {
  try {
    const { email, orderDetails } = req.body;

    console.log('Received order confirmation request:', {
      email,
      orderId: orderDetails?.id
    });

    // Validate input
    if (!email || !orderDetails) {
      logger.warn('Missing email or order details', { 
        email: !!email, 
        orderDetails: !!orderDetails 
      });
      return res.status(400).json({ 
        error: 'Missing required fields: email and orderDetails' 
      });
    }

    // Log incoming request details (sanitized)
    logger.info('Received order confirmation request', {
      email: email.replace(/^(.)(.*)(.@.*)$/, '$1***$3'),
      orderId: orderDetails.id,
      totalItems: orderDetails.items?.length || 0
    });

    // Send email
    const result = await sendOrderConfirmationEmail({
      email,
      ...orderDetails
    });

    // Respond with success
    res.status(200).json({
      success: true,
      messageId: result.messageId
    });
  } catch (error) {
    logger.error('Error processing order confirmation email', {
      message: error.message,
      stack: error.stack
    });

    res.status(500).json({ 
      error: 'Failed to send order confirmation email', 
      details: error.message 
    });
  }
});

// Password Reset Email Route
router.post('/password-reset', verifyToken, async (req, res) => {
  try {
    const { 
      email, 
      resetLink 
    } = req.body;

    await sendPasswordResetEmail(email, resetLink);
    
    logger.info(`Password reset email sent to ${email}`);
    res.status(200).json({ 
      message: 'Password reset email sent successfully' 
    });
  } catch (error) {
    logger.error(`Failed to send password reset email: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to send password reset email' 
    });
  }
});

// Generic Email Route (for future flexibility)
router.post('/send', verifyToken, async (req, res) => {
  try {
    const { 
      email, 
      subject, 
      text, 
      html 
    } = req.body;

    await sendGenericEmail(email, subject, text, html);
    
    logger.info(`Generic email sent to ${email}`);
    res.status(200).json({ 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    logger.error(`Failed to send generic email: ${error.message}`);
    res.status(500).json({ 
      error: 'Failed to send email' 
    });
  }
});

module.exports = router;
