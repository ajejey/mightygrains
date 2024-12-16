export async function validatePincode(pincode) {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (!data?.[0] || data[0].Status === 'Error') {
      return {
        isValid: false,
        message: 'Invalid PIN code',
        data: null
      };
    }

    const postOffice = data[0].PostOffice?.[0];
    if (!postOffice) {
      return {
        isValid: false,
        message: 'Unable to verify PIN code',
        data: null
      };
    }

    // Check if it's within Bangalore
    const isWithinBangalore = postOffice.District?.toLowerCase().includes('bangalore') || 
                             postOffice.Region?.toLowerCase().includes('bangalore') ||
                             postOffice.Division?.toLowerCase().includes('bangalore');

    return {
      isValid: true,
      isWithinBangalore,
      message: 'Valid PIN code',
      data: postOffice
    };
  } catch (error) {
    console.error('Pincode validation error:', error);
    return {
      isValid: true, // Default to true on API error
      message: 'Unable to verify PIN code',
      data: null
    };
  }
}
