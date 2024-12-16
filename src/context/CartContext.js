'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { account } from '@/appwrite/clientConfig';
import { syncUserCart, getCartForUser } from '@/app/checkout/actions';
import { createUserInDatabase } from '@/app/actions';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(true);

    // Calculate total whenever cart items change
    useEffect(() => {
        const newTotal = cart.items.reduce((total, item) => 
            total + (item.product.price.amount * item.quantity), 0);
        
        setCart(prev => ({
            ...prev,
            total: newTotal
        }));
    }, [cart.items]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
        setLoading(false);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, loading]);

    // Sync cart with database when user logs in
    useEffect(() => {
        const syncCart = async () => {
            try {
                const session = await account.get();
                if (session) {
                    // Ensure user exists in database
                    await createUserInDatabase({
                        appwriteId: session.$id,
                        email: session.email,
                        fullName: session.name || null
                    });

                    // Fetch existing cart from database
                    const dbCartItems = await getCartForUser(session.$id);
                    
                    // Merge or replace local cart
                    if (dbCartItems.length > 0) {
                        setCart({
                            items: dbCartItems.map(item => ({
                                product: {
                                    id: item.product.id,
                                    price: {
                                        amount: item.price
                                    }
                                },
                                quantity: item.quantity
                            })),
                            total: dbCartItems.reduce((total, item) => 
                                total + (item.price * item.quantity), 0)
                        });
                    }
                }
            } catch (error) {
                console.error('Cart sync error:', error);
            }
        };
        console.log('adding to cart outside')
        if (!loading) {
            console.log('adding to cart inside if')
            syncCart();
        }
    }, [loading]);

    useEffect(() => {
        const syncCart = async () => {
            try {
                const session = await account.get();
                if (!session || loading) return;

                console.log('Syncing cart with server', cart.items);
                
                // Only sync if cart has items
                if (cart.items.length > 0) {
                    await syncUserCart(session.$id, cart.items);
                }
            } catch (error) {
                console.error('Cart sync error:', error);
            }
        };

        // Debounce cart sync to prevent excessive calls
        const timeoutId = setTimeout(syncCart, 500);

        // Cleanup timeout to prevent memory leaks
        return () => clearTimeout(timeoutId);
    }, [cart.items, loading]);

    const MAX_QUANTITY_PER_PRODUCT = 5;

    const addToCart = (product, quantity = 1) => {
      // Find if product already exists in cart
      const existingItemIndex = cart.items.findIndex(item => item.product.id === product.id);
      
      // Calculate total quantity including existing and new quantity
      const totalQuantity = existingItemIndex !== -1 
        ? cart.items[existingItemIndex].quantity + quantity 
        : quantity;

      // Check if total quantity exceeds max limit
      if (totalQuantity > MAX_QUANTITY_PER_PRODUCT) {
        // If it would exceed, set to max
        const adjustedQuantity = Math.min(totalQuantity, MAX_QUANTITY_PER_PRODUCT);
        
        setCart(prev => {
          // If product exists, update its quantity
          if (existingItemIndex > -1) {
            const updatedItems = [...prev.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: adjustedQuantity
            };

            return { 
              ...prev, 
              items: updatedItems 
            };
          }

          // If product doesn't exist, add with max quantity
          return { 
            ...prev, 
            items: [...prev.items, { product, quantity: adjustedQuantity }] 
          };
        });

        // Show a console log about max quantity
        console.log(`Maximum quantity of ${MAX_QUANTITY_PER_PRODUCT} reached for this product`);
        return;
      }

      // Normal add to cart logic if within limits
      setCart(prev => {
        // If product already exists, update its quantity
        if (existingItemIndex > -1) {
          const updatedItems = [...prev.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };

          return { 
            ...prev, 
            items: updatedItems 
          };
        }

        // Add new item to cart
        return { 
          ...prev, 
          items: [...prev.items, { product, quantity }] 
        };
      });
    };

    const updateQuantity = (productId, newQuantity) => {
      // Ensure new quantity is within max limit
      const safeQuantity = Math.min(Math.max(1, newQuantity), MAX_QUANTITY_PER_PRODUCT);

      setCart(prev => {
        // Find the index of the item to update
        const updatedItems = prev.items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: safeQuantity } 
            : item
        );

        return { 
          ...prev, 
          items: updatedItems 
        };
      });

      // Log if max quantity was attempted
      if (newQuantity > MAX_QUANTITY_PER_PRODUCT) {
        console.log(`Maximum quantity of ${MAX_QUANTITY_PER_PRODUCT} reached for this product`);
      }
    };

    const removeFromCart = (productId) => {
      setCart(prev => ({
        ...prev,
        items: prev.items.filter(item => item.product.id !== productId)
      }));
    };

    const clearCart = () => {
      setCart({ items: [], total: 0 });
    };

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            updateQuantity,
            removeFromCart, 
            clearCart,
            loading 
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
