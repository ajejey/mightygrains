'use client';

export default function OrderSummary({ items }) {
  // Ensure we're using the correct items structure
  const cartItems = items.items || items;
  
  // Calculate total
  const total = cartItems.reduce((sum, item) => 
    sum + (item.product.price.amount * item.quantity), 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">Your cart is empty</p>
          <p className="text-sm mt-2">Add some delicious products to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cartItems.map((item, index) => (
              <div 
                key={item.product.id || index} 
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  {item.product.image && (
                    <img 
                      src={typeof item.product.image === 'string' 
                        ? item.product.image 
                        : item.product.image.src} 
                      alt={item.product.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-gray-500 text-sm">
                      ₹{item.product.price.amount} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{item.product.price.amount * item.quantity}
                </p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
