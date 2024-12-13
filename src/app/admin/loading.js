import React from 'react'

export default function AdminLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Admin Dashboard...</p>
      </div>
    </div>
  );
}