'use client';

import { useState } from 'react';
import { ID } from 'appwrite';
import { createUserInDatabase } from '@/app/actions';
import { account } from '@/appwrite/clientConfig';

export default function AuthEmailOtpModal({ 
  onAuthSuccess, 
  initialEmail = '', 
  initialFullName = '' 
}) {
  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState(initialFullName);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const sessionToken = await account.createEmailToken(
        ID.unique(),
        email
      );
      setUserId(sessionToken.userId);
      setOtpSent(true);
      setError('');
    } catch (error) {
      console.error('OTP send error:', error);
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const session = await account.createSession(
        userId,
        otp
      );

      // If this is a new user, create them in MongoDB
      if (!session.providerAccessToken) {
        await createUserInDatabase({
          appwriteId: session.userId,
          email: email,
          fullName: fullName
        });
      }

      // Call success callback with user data
      onAuthSuccess(session);
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (otpSent) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Enter OTP
          </h2>
          <p className="text-gray-600 mb-3 text-center">
            Please enter the 6-digit code sent to {email}
          </p>
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <p className="text-amber-800 text-sm">
              <span className="font-semibold">Need help finding the OTP?</span><br />
              Check your email (including spam/junk folder) from <span className="font-medium">Appwrite &lt;noreply@appwrite.io&gt;</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp('');
                setError('');
              }}
              className="w-full text-green-600 py-2 hover:text-green-700 transition-colors"
            >
              Back to Email Entry
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Sign In / Sign Up
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We&apos;ll send you a one-time code to sign in or create an account
        </p>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name (for new users)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto"> */}
        {renderContent()}
      {/* </div> */}
    </div>
  );
}
