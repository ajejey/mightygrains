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
                                    productId: item.product.id,
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

    const addToCart = (product, quantity = 1) => {
        console.log('Adding to cart:', product);
        setCart(prev => {
            // Check if product already exists in cart
            const existingItemIndex = prev.items.findIndex(
                item => item.product.id === product.id
            );

            if (existingItemIndex > -1) {
                // Update quantity of existing item
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
        // Ensure quantity is at least 1
        const safeQuantity = Math.max(1, newQuantity);

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
