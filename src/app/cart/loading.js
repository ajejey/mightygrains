import React from 'react';

export default function CartLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="md:col-span-2 space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
              {/* Product Image Skeleton */}
              <div className="w-24 h-24 bg-gray-200 rounded"></div>
              
              {/* Product Details Skeleton */}
              <div className="flex-grow space-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Quantity and Price Skeleton */}
              <div className="flex flex-col items-end space-y-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-full mt-4"></div>
        </div>
      </div>
    </div>
  );
}