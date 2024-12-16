import { validatePincode } from '@/utils/pincode';

export async function calculateDeliveryFee(pincode, productsTotalAmount) {
  try {
    // If total amount is 499 or more, free delivery
    if (productsTotalAmount >= 499) {
      return {
        success: true,
        deliveryFee: 0,
        message: 'Free Delivery!'
      };
    }

    // Validate pincode
    const pincodeValidation = await validatePincode(pincode);

    // If pincode validation fails, return a default fee
    if (!pincodeValidation.isValid) {
      return {
        success: false,
        deliveryFee: 50,
        message: 'Unable to validate pincode. Default delivery fee applied.',
        pincodeValidation
      };
    }

    // Determine delivery fee based on location
    const deliveryFee = pincodeValidation.isWithinBangalore ? 30 : 50;

    return {
      success: true,
      deliveryFee,
      message: pincodeValidation.isWithinBangalore 
        ? 'Local delivery fee applied' 
        : 'Outstation delivery fee applied',
      pincodeValidation
    };
  } catch (error) {
    console.error('Delivery fee calculation error:', error);
    return {
      success: false,
      deliveryFee: 50,
      message: 'Error calculating delivery fee. Default fee applied.'
    };
  }
}
