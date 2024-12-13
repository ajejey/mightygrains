'use client'

import { useState } from 'react';
import { sendTestEmailAction } from '@/app/actions';

export default function TestEmailButton() {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendTestEmail = async () => {
    setIsLoading(true);
    setStatus('');

    try {
      const result = await sendTestEmailAction();
      setStatus(result.message);
    } catch (error) {
      setStatus('An error occurred while sending email.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button 
        onClick={handleSendTestEmail}
        disabled={isLoading}
        className={`
          px-4 py-2 rounded 
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-500 hover:bg-green-600 text-white'}
        `}
      >
        {isLoading ? 'Sending...' : 'Send Test Email'}
      </button>
      {status && (
        <p className={`
          text-sm 
          ${status.includes('successfully') 
            ? 'text-green-600' 
            : 'text-red-600'}
        `}>
          {status}
        </p>
      )}
    </div>
  );
}
