import React from 'react';


const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-6">Privacy Policy for Mighty Grains</h1>
          
          <p className="mb-4 text-amber-800">
            At Mighty Grains, accessible at https://www.mightygrains.in, we prioritize the privacy of our visitors. This Privacy Policy outlines the types of information we collect, how we use it, and how we safeguard it, especially regarding your payment information in compliance with Razorpay&apos;s standards.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">1. Information We Collect</h2>
          <p className="mb-4 text-amber-800">
            When you visit our website, place an order, or interact with us, we may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 mb-4 text-amber-800">
            <li><strong>Personal Information:</strong> This may include your name, email address, phone number, billing address, and shipping address, which are necessary for order processing and communication.</li>
            <li><strong>Payment Information:</strong> We use Razorpay for secure payment processing. During transactions, we may collect data relevant to your payment, such as card information or UPI details. Razorpay manages this data securely on their platform, and we do not store any sensitive payment details directly on our website.</li>
            <li><strong>Technical Information:</strong> We may automatically collect data related to your device, browser, IP address, and browsing behavior on our website to improve our services.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">2. Use of Information</h2>
          <p className="mb-4 text-amber-800">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4 text-amber-800">
            <li>Process and fulfill orders.</li>
            <li>Communicate with you regarding your order status or respond to your inquiries.</li>
            <li>Improve our website and customer service.</li>
            <li>Ensure compliance with legal obligations.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">3. Sharing of Information</h2>
          <p className="mb-4 text-amber-800">
            We respect your privacy and do not sell or rent your personal information. We may share data only with:
          </p>
          <ul className="list-disc pl-6 mb-4 text-amber-800">
            <li><strong>Razorpay:</strong> For secure payment processing. Razorpay handles your payment data according to their privacy policy, which can be found <a href="https://razorpay.com/privacy/" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">here</a>.</li>
            <li><strong>Service Providers:</strong> For services essential to our website operations, such as logistics or technical support. These providers are obligated to keep your data secure and confidential.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or to protect our rights, safety, or property.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">4. Data Security</h2>
          <p className="mb-4 text-amber-800">
            We take data security seriously and implement appropriate measures to safeguard your information. Razorpay&apos;s secure payment gateway is PCI-DSS compliant, which means that it adheres to stringent security standards for handling and processing your payment data.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">5. Cookies and Tracking Technologies</h2>
          <p className="mb-4 text-amber-800">
            We use cookies to enhance your experience on our website, such as saving your preferences and analyzing site traffic. You can manage cookie settings in your browser preferences.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">6. Third-Party Links</h2>
          <p className="mb-4 text-amber-800">
            Our website may contain links to third-party sites. This Privacy Policy does not cover these external sites, so we encourage you to review their privacy policies independently.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">7. Your Rights</h2>
          <p className="mb-4 text-amber-800">
            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Contact us at hello@mightygrains.com for any such requests.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">8. Updates to This Policy</h2>
          <p className="mb-4 text-amber-800">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with the date of revision.
          </p>

          <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-3">Contact Us</h2>
          <p className="mb-4 text-amber-800">
            If you have any questions or concerns about this Privacy Policy or your data, please contact us at:
          </p>
          <p className="mb-4 text-amber-800">
            Email: hello@mightygrains.com<br />
            Address: 123 Grain Street, Healthy Baby Plaza, Bangalore, Karnataka 560001, India
          </p>

          <p className="mt-8 text-sm text-gray-600">
            Effective Date: Nov 04, 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;