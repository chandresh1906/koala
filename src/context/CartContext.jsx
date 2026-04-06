import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls the drawer globally!

  const addToCart = (product, selectedVariant) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id && item.colorHex === selectedVariant.hex);
      if (existing) {
        return prev.map(item => item.id === product.id && item.colorHex === selectedVariant.hex 
          ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: product.id, title: product.title, colorName: selectedVariant.colorName,
        colorHex: selectedVariant.hex, price: selectedVariant.price, 
        image: selectedVariant.images[0], quantity: 1
      }];
    });
    setIsCartOpen(true); // Open drawer automatically
  };

  const removeFromCart = (id, colorHex) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.colorHex === colorHex)));
  };

  const updateQuantity = (id, colorHex, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.colorHex === colorHex) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};