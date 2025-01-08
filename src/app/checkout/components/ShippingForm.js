'use client';

import { useState, useEffect } from 'react';
import { ALL_STATES_AND_UTS } from '@/utils/indianStates';

export default function ShippingForm({ 
  initialData, 
  onSubmit, 
  shippingLoading,
  errors = {},
}) {

 console.log("shippingLoading", shippingLoading);

  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.userDetails?.defaultShippingAddress?.phone || '',
    address: initialData?.userDetails?.defaultShippingAddress?.address || '',
    city: initialData?.userDetails?.defaultShippingAddress?.city || '',
    state: initialData?.userDetails?.defaultShippingAddress?.state || '',
    pincode: initialData?.userDetails?.defaultShippingAddress?.pincode || '',
  });

  const [stateInput, setStateInput] = useState(initialData?.userDetails?.defaultShippingAddress?.state || '');
  const [filteredStates, setFilteredStates] = useState([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      setStateInput(value);
      setFormData(prev => ({ ...prev, state: value }));

      // Filter states based on input
      const filtered = ALL_STATES_AND_UTS.filter(state => 
        state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowStateDropdown(true);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleStateSelect = (state) => {
    setStateInput(state);
    setFormData(prev => ({ ...prev, state: state }));
    setShowStateDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shippingLoading) return; // Prevent multiple submissions
    
    onSubmit({
      ...formData,
      state: stateInput,
    });
  };

  useEffect(() => {
    const errorFields = Object.keys(errors);
    if (errorFields.length > 0) {
      const firstErrorField = document.getElementById(errorFields[0]);
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  }, [errors]);

  useEffect(() => {
    if (initialData) {
      const initialState = initialData?.userDetails?.defaultShippingAddress?.state || '';
      setFormData(prev => ({
        fullName: initialData?.fullName || prev.fullName,
        email: initialData?.email || prev.email,
        phone: initialData?.userDetails?.defaultShippingAddress?.phone || prev.phone,
        address: initialData?.userDetails?.defaultShippingAddress?.address || prev.address,
        city: initialData?.userDetails?.defaultShippingAddress?.city || prev.city,
        state: initialState,
        pincode: initialData?.userDetails?.defaultShippingAddress?.pincode || prev.pincode,
      }));
      
      // Set state input for autocomplete
      setStateInput(initialState);
    }
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      {shippingLoading && (
        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {/* Full Name Input */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3
            ${errors.fullName ? 'border-red-500 text-red-900' : ''}`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3
            ${errors.email ? 'border-red-500 text-red-900' : ''}`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3
            ${errors.phone ? 'border-red-500 text-red-900' : ''}`}
          placeholder="Enter phone number (e.g., 9876543210)"
        />
        {initialData?.userDetailsLoading && (
          <p className="mt-1 text-sm text-gray-600">Loading...</p>
        )}
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Address Input */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          rows="3"
          value={formData.address}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 
            ${errors.address ? 'border-red-500 text-red-900' : ''}`}
          placeholder="Street Address"
        />
        {initialData?.userDetailsLoading && (
          <p className="mt-1 text-sm text-gray-600">Loading...</p>
        )}
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address}</p>
        )}
      </div>

      {/* City, State, Postal Code, and Country Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* City Input - First row */}
        <div className="lg:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 
              ${errors.city ? 'border-red-500 text-red-900' : ''}`}
          />
          {initialData?.userDetailsLoading && (
            <p className="mt-1 text-sm text-gray-600">Loading...</p>
          )}
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        {/* State Input - First row */}
        <div className="lg:col-span-2 relative">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={stateInput}
            onChange={handleChange}
            onFocus={() => setShowStateDropdown(true)}
            onBlur={() => setTimeout(() => setShowStateDropdown(false), 200)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 
              ${errors.state ? 'border-red-500 text-red-900' : ''}`}
            autoComplete="off"
          />
          {showStateDropdown && filteredStates.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredStates.map((state, index) => (
                <div 
                  key={index} 
                  onClick={() => handleStateSelect(state)}
                  className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm text-gray-700 hover:text-green-800"
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pincode Input - Second row */}
        <div className="lg:col-span-2">
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3  
              ${errors.pincode ? 'border-red-500 text-red-900' : ''}`}
            placeholder="12345"
          />
          {initialData?.userDetailsLoading && (
            <p className="mt-1 text-sm text-gray-600">Loading...</p>
          )}
          {errors.pincode && (
            <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
          )}
          {initialData?.pincodeValidation?.message && !initialData?.pincodeValidation?.isValid && (
            <div className="mt-2 p-3 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Warning:</span> {initialData.pincodeValidation.message}.<br/>
                If you&apos;re having trouble, please <a href="/contact" className="underline hover:text-yellow-900">contact us</a> for assistance.
              </p>
            </div>
          )}
        </div>

        {/* Country Input - Second row */}
        <div className="lg:col-span-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            readOnly
            value={formData.country || 'India'}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 
              ${errors.country ? 'border-red-500 text-red-900' : ''}`}
          >
            <option value="India">India</option>
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={shippingLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {shippingLoading ? "Loading..." : "Continue to Payment"}
        </button>
      </div>
    </form>
  );
}
