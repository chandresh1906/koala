import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../../Api_path";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. FETCH ON LOAD (GET)
  useEffect(() => {
    axios.get(`${API_URL}/cart`)
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  // 2. ADD / UPDATE CART (POST / PUT)
  const addToCart = async (product, selectedVariant) => {
    // Check if item exists by matching the exact Product ID and Color
    const existingItem = cart.find(item => 
      item.productId === product.id && item.colorHex === selectedVariant.hex
    );

    if (existingItem) {
      // UPDATE: Item exists, increase quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      
      // Update UI Instantly
      setCart(prev => prev.map(item => item.id === existingItem.id ? updatedItem : item));
      
      // Update DB
      try {
        await axios.put(`${API_URL}/cart/${existingItem.id}`, updatedItem);
      } catch (err) { 
        console.error("Failed to update item in DB:", err); 
      }
      
    } else {
      // ADD: Completely new item
      const newItem = {
        id: `${product.id}_${selectedVariant.hex.replace('#', '')}`,
        productId: product.id,
        title: product.title,
        colorName: selectedVariant.colorName,
        colorHex: selectedVariant.hex,
        price: selectedVariant.price,
        image: selectedVariant.images[0],
        quantity: 1
      };
      
      // Update UI Instantly
      setCart(prev => [...prev, newItem]);
      
      // Add to DB
      try {
        await axios.post(`${API_URL}/cart`, newItem);
      } catch (err) { 
        console.error("Failed to save item to DB:", err); 
      }
    }
    
    setIsCartOpen(true);
  };

  // 3. REMOVE FROM CART (DELETE)
  // We now use the exact `id` passed from the CartDrawer. No guessing!
  const removeFromCart = async (id, colorHex) => {
    // Update UI Instantly
    setCart(prev => prev.filter(item => item.id !== id));
    
    // Delete from DB
    try {
      await axios.delete(`${API_URL}/cart/${id}`);
    } catch (err) { 
      console.error("Failed to delete item from DB:", err); 
    }
  };

  // 4. UPDATE QUANTITY (PUT)
  const updateQuantity = async (id, colorHex, amount) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const newQty = item.quantity + amount;

    if (newQty > 0) {
      const updatedItem = { ...item, quantity: newQty };
      
      // Update UI Instantly
      setCart(prev => prev.map(i => i.id === id ? updatedItem : i));
      
      // Update DB
      try {
        await axios.put(`${API_URL}/cart/${id}`, updatedItem);
      } catch (err) { 
        console.error("Failed to update quantity in DB:", err); 
      }
    } else {
      // If quantity is 0, completely delete it
      removeFromCart(id, colorHex);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};