'use client';

import { useState } from 'react';
import { ID } from 'appwrite';
import { createUserInDatabase } from '@/app/actions';
import { account } from '@/appwrite/clientConfig';

export default function AuthModal({ 
  onAuthSuccess, 
  initialEmail = '', 
  initialFullName = '' 
}) {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(initialFullName);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let session;
      if (view === 'signup') {
        // Create new account
        const user = await account.create(
          ID.unique(), 
          email, 
          password, 
          fullName
        );

        // Create email session
        session = await account.createEmailPasswordSession(email, password);

        // Create user in MongoDB
        await createUserInDatabase({
          appwriteId: session.userId,
          email: email,
          fullName: fullName
        });
      } else if (view === 'login') {
        // Create email session for existing user
        session = await account.createEmailPasswordSession(email, password);
      }

      // Call success callback with user data
      onAuthSuccess(session);
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetEmailSent(false);

    try {
      // Generate password reset link
      // Using window.location.origin to get the current site's base URL
      const resetUrl = `${window.location.origin}/reset-password`;
      
      await account.createRecovery(email, resetUrl);
      
      setResetEmailSent(true);
      setError('');
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (resetEmailSent) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            A password reset link has been sent to {email}. 
            Please check your inbox (and spam folder).
          </p>
          <button 
            onClick={() => {
              setView('login');
              setResetEmailSent(false);
            }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={view === 'forgotPassword' ? handleForgotPassword : handleSubmit}>
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          {view === 'login' ? 'Login' : 
           view === 'signup' ? 'Create Account' : 
           'Reset Password'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {(view === 'signup' && !resetEmailSent) && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {view !== 'forgotPassword' && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          )}
        </div>

        {view === 'login' && (
          <div className="text-right mt-2">
            <button 
              type="button"
              onClick={() => setView('forgotPassword')}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Processing...' : 
           view === 'login' ? 'Login' : 
           view === 'signup' ? 'Sign Up' : 
           'Reset Password'}
        </button>

        <div className="text-center mt-4">
          {view === 'login' ? (
            <p>
              Don't have an account? 
              <button 
                type="button"
                onClick={() => setView('signup')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                Sign Up
              </button>
            </p>
          ) : view === 'signup' ? (
            <p>
              Already have an account? 
              <button 
                type="button"
                onClick={() => setView('login')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              Remember your password? 
              <button 
                type="button"
                onClick={() => setView('login')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
}
