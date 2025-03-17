
/**
 * Custom hook for shopping cart functionality
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define cart item type
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  [key: string]: any; // Allow for additional properties
};

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Add item to cart
  const addToCart = (product: CartItem) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      let newItems;
      if (existingItemIndex >= 0) {
        // If exists, increase quantity
        newItems = [...prevItems];
        const existingItem = newItems[existingItemIndex];
        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: (existingItem.quantity || 1) + 1
        };
      } else {
        // If new, add with quantity 1
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      // Dispatch event to notify components
      window.dispatchEvent(new Event('cartUpdate'));
      
      // Show toast
      toast.success('המוצר נוסף לסל');
      
      return newItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      // Dispatch event
      window.dispatchEvent(new Event('cartUpdate'));
      
      return newItems;
    });
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(newItems));
      
      // Dispatch event
      window.dispatchEvent(new Event('cartUpdate'));
      
      return newItems;
    });
  };

  // Get cart count
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdate'));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
    clearCart
  };
}
