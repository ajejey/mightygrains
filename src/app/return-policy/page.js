import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Cancellation and Refund Policy | Mighty Grains',
  description: 'Learn about the Cancellation and Refund Policy for Mighty Grains products.',
};

const ReturnPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Cancellation and Refund Policy for Mighty Grains</h1>
        
        <p className="mb-4 text-amber-800">
          At Mighty Grains, we strive to ensure our customers are satisfied with their purchases. This Cancellation and Refund Policy outlines the conditions under which orders can be canceled, returned, or refunded. By placing an order on our website (<a href="https://www.mightygrains.in" className="text-green-600 hover:underline">https://www.mightygrains.in</a>), you agree to the terms outlined below.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">1. Order Cancellations</h2>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Customer-Initiated Cancellations:</strong> If you wish to cancel an order, please contact us at hello@mightygrains.com or +91 98765 43210 as soon as possible. Orders can only be canceled before they have been shipped. Once an order is dispatched, it cannot be canceled.</li>
          <li><strong>Cancellation Due to Non-Availability:</strong> In the rare event that a product is unavailable or out of stock after your order has been placed, we will notify you promptly and provide a full refund.</li>
          <li><strong>Suspected Fraudulent Orders:</strong> We reserve the right to cancel any order if we suspect fraudulent activity. In such cases, you will be notified, and a refund will be issued as per our refund timeline.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">2. Return Policy</h2>
        <p className="mb-4 text-amber-800">
          Due to the perishable nature of our products, we only accept returns if the product is defective, damaged, or if the wrong item was delivered. Please check your order upon delivery and notify us immediately if there is an issue. To request a return:
        </p>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Contact Us:</strong> Email us at hello@mightygrains.com within 3 days of receiving the product, along with your order number, a photo of the product, and a description of the issue.</li>
          <li><strong>Return Approval:</strong> Upon reviewing your request, we will confirm whether the return is eligible and provide instructions on how to proceed.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">3. Refund Policy</h2>
        <p className="mb-4 text-amber-800">Refunds are provided in the following cases:</p>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Order Cancellations:</strong> If you cancel an order before it has been shipped, we will process a full refund to your original payment method within 5 business days.</li>
          <li><strong>Accepted Returns:</strong> Once your return request is approved and the item has been returned, we will inspect the product. If the return is valid, we will initiate a refund to your original payment method within 7 business days.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">4. Refund Process and Timeline</h2>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Refund Method:</strong> Refunds will be issued to the original payment method (e.g., bank account, credit/debit card, or UPI) used at the time of purchase.</li>
          <li><strong>Processing Time:</strong> Refunds typically take 5-7 business days to process after approval, depending on your bank or card issuer.</li>
          <li><strong>Notification:</strong> Once a refund is initiated, you will receive a confirmation email from us. If you do not receive a refund within the expected timeframe, please contact your bank or card issuer for more information.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">5. Non-Refundable Items</h2>
        <p className="mb-4 text-amber-800">Please note that we do not provide refunds or accept returns in the following cases:</p>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li>Products that have been opened or partially used, unless they arrived damaged or defective.</li>
          <li>Orders canceled after the product has been shipped.</li>
          <li>Perishable items that are not defective or damaged.</li>
        </ul>

      </div>
    </div>
  );
};

export default ReturnPolicyPage;