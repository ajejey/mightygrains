# Mighty Grains Email Microservice

## Overview
This is a standalone Node.js Express microservice for handling email sending functionality for the Mighty Grains application.

## Prerequisites
- Node.js (v16 or higher)
- npm

## Setup
1. Clone the repository
2. Copy `example.env` to `.env` and fill in your credentials
3. Install dependencies:
   ```
   npm install
   ```

## Environment Variables
- `PORT`: Port for the email service
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: Email sender's address
- `SMTP_PASS`: Email sender's password
- `ALLOWED_ORIGIN`: Frontend domain for CORS
- `JWT_SECRET`: Secret key for JWT authentication

## Running the Service
- Development: `npm run dev`
- Production: `npm start`

## Endpoints
- `/api/email/order-confirmation`: Send order confirmation emails
- `/api/email/password-reset`: Send password reset emails
- `/api/email/send`: Generic email sending

## Authentication
All endpoints require a valid JWT token in the Authorization header.

## Logging
Logs are stored in the `logs/` directory with separate files for combined and error logs.
