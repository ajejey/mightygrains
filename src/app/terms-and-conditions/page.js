import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | Mighty Grains',
  description: 'Read about the Terms and Conditions for using Mighty Grains website and services.',
};

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Terms and Conditions for Mighty Grains</h1>
        
        <p className="mb-4 text-amber-800">
          Welcome to Mighty Grains! These Terms and Conditions govern your access to and use of our website. By using our site, you agree to comply with these terms. Please read them carefully.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4 text-amber-800">
          By accessing or using our website, you confirm that you accept these Terms and Conditions and agree to be bound by them. If you disagree with any part of these terms, please do not use our website.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">2. Eligibility</h2>
        <p className="mb-4 text-amber-800">
          To use our website, you must be at least 18 years old or have permission from a parent or guardian. By making a purchase, you confirm that you meet this requirement.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">3. Products and Services</h2>
        <p className="mb-4 text-amber-800">
          We offer a range of homemade food products, including grains, porridge, chutney pudis, and millet-based breads. All product descriptions, prices, and availability are subject to change without notice.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">4. Orders and Payment</h2>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Order Process:</strong> When you place an order with us, you will receive an order confirmation via email. This confirmation does not guarantee product availability; we will notify you if an item is out of stock.</li>
          <li><strong>Pricing:</strong> All prices are listed in INR and are inclusive of applicable taxes unless stated otherwise.</li>
          <li><strong>Payment:</strong> We use Razorpay to securely process payments. By providing payment information, you authorize us to charge the specified amount. Please refer to Razorpay&apos;s Terms of Service for more information.</li>
          <li><strong>Order Cancellation:</strong> We reserve the right to cancel orders if we suspect any fraudulent activity or in the event of an inventory shortage. If we cancel your order, we will notify you and issue a refund as necessary.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">5. Shipping and Delivery</h2>
        <p className="mb-4 text-amber-800">
          We ship products within India and strive to deliver within the estimated time frame. However, delivery timelines may vary based on location and shipping provider. Please note that we are not liable for delays beyond our control.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">6. Returns and Refunds</h2>
        <p className="mb-4 text-amber-800">Our return and refund policy is as follows:</p>
        <ul className="list-disc pl-6 mb-4 text-amber-800">
          <li><strong>Returns:</strong> Due to the perishable nature of our products, we only accept returns if the product is defective or damaged upon arrival. Please contact us within 3 days of receiving your order to arrange a return.</li>
          <li><strong>Refunds:</strong> Approved refunds will be processed through the original payment method within 7 days after we confirm your eligibility.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">7. Intellectual Property</h2>
        <p className="mb-4 text-amber-800">
          All content on this website, including text, images, logos, and product descriptions, is the intellectual property of Mighty Grains and is protected by copyright laws. You may not reproduce, distribute, or exploit any part of our website without express permission.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">8. Limitation of Liability</h2>
        <p className="mb-4 text-amber-800">
          Mighty Grains and its affiliates shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of our website or products. Our liability is limited to the maximum extent permitted by law.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">9. Privacy</h2>
        <p className="mb-4 text-amber-800">
          Your privacy is important to us. Please refer to our <Link href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</Link> to understand how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">10. Modification of Terms</h2>
        <p className="mb-4 text-amber-800">
          We reserve the right to update or modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website, and your continued use of the site implies acceptance of the modified terms.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">11. Governing Law</h2>
        <p className="mb-4 text-amber-800">
          These Terms and Conditions are governed by the laws of India. Any disputes arising from your use of our website or products shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">12. Contact Information</h2>
        <p className="mb-4 text-amber-800">
          For any questions or concerns regarding these Terms and Conditions, please contact us at:
        </p>
        <p className="mb-4 text-amber-800">
          Email: mightygrains656@gmail.com
         </p>

        <p className="mt-8 text-sm text-gray-600">
          Effective Date: Nov 04, 2023
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;