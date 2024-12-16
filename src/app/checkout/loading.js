import React from 'react';

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Page Title Skeleton */}
        <div className="h-10 bg-gray-200 rounded w-1/2 mb-8"></div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Shipping Form Skeleton */}
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="space-y-4">
                {/* Form Field Skeletons */}
                {[1, 2, 3, 4, 5].map((field) => (
                  <div key={field} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary Skeleton */}
          <div className="bg-gray-100 p-6 rounded-lg space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            
            {/* Cart Item Skeletons */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}

            {/* Price Breakdown Skeletons */}
            <div className="space-y-2 border-t pt-4">
              {['Subtotal', 'Shipping', 'Total'].map((label) => (
                <div key={label} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>

            {/* Button Skeleton */}
            <div className="h-12 bg-gray-200 rounded mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}