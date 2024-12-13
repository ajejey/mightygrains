'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { account } from '@/appwrite/clientConfig';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyRecoveryLink = async () => {
      try {
        // Log all search params for debugging
        const allParams = Object.fromEntries(searchParams.entries());
        console.log('All Search Params:', allParams);

        // Try different ways of extracting userId and secret
        const recoveryUserId = searchParams.get('userId');
        const recoverySecret = searchParams.get('secret');

        console.log('Extracted userId:', recoveryUserId);
        console.log('Extracted secret:', recoverySecret);

        if (!recoveryUserId || !recoverySecret) {
          // If direct get fails, try alternative extraction
          const fullUrl = window.location.href;
          const urlParams = new URL(fullUrl).searchParams;
          
          const altUserId = urlParams.get('userId');
          const altSecret = urlParams.get('secret');

          console.log('Alternative userId:', altUserId);
          console.log('Alternative secret:', altSecret);

          if (!altUserId || !altSecret) {
            throw new Error('Could not extract userId or secret');
          }

          setUserId(altUserId);
          setSecret(altSecret);
        } else {
          setUserId(recoveryUserId);
          setSecret(recoverySecret);
        }

        setLoading(false);
      } catch (error) {
        console.error('Recovery link verification error:', error);
        setError('Invalid or expired reset link. Please request a new password reset.');
        setLoading(false);
      }
    };

    // Only run verification if we're on the client side
    if (typeof window !== 'undefined') {
      verifyRecoveryLink();
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Complete the password recovery using Appwrite's updateRecovery method
      await account.updateRecovery(userId, secret, newPassword, confirmPassword);
      
      setSuccess(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to reset password. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center">
            <p className="text-gray-600">Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
            <div className="mt-4 text-sm">
              <p>Troubleshooting Tips:</p>
              <ul className="list-disc list-inside">
                <li>Ensure you clicked the most recent reset link</li>
                <li>Check that the link hasn't expired</li>
                <li>Request a new password reset</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            Password reset successful! Redirecting to home...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className=" p-8 w-full max-w-md">
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Reset Password
            </button>
          </div>

          <p className="mt-2 text-center text-sm text-gray-600">
            Remember your password? 
            <button 
              type="button"
              onClick={() => router.push('/')}
              className="ml-2 text-green-600 hover:text-green-800"
            >
              Back to Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
