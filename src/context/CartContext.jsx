
import React, { createContext, useContext, useState } from "react";

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
    const existingItem = cart.find(item => 
      String(item.productId) === String(product.id) && item.colorHex === selectedVariant.hex
    );

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      try {
        const res = await axios.put(`${API_URL}/cart/${existingItem.id}`, updatedItem);
        setCart(prev => prev.map(item => item.id === existingItem.id ? res.data : item));
      } catch (err) { 
        console.error("Failed to update item in DB:", err); 
      }
    } else {
      const newItemPayload = {
        id: `${product.id}_${selectedVariant.hex.replace('#', '')}`,
        productId: String(product.id), 
        title: product.title,
        colorName: selectedVariant.colorName,
        colorHex: selectedVariant.hex,
        price: selectedVariant.price,
        image: selectedVariant.images[0],
        quantity: 1
      };
      
      try {
        const res = await axios.post(`${API_URL}/cart`, newItemPayload);
        setCart(prev => [...prev, res.data]);
      } catch (err) { 
        console.error("Failed to save item to DB:", err); 
      }
    }
    
    setIsCartOpen(true);
  };

  // 3. REMOVE FROM CART (DELETE)
  const removeFromCart = async (id, colorHex) => {
    setCart(prev => prev.filter(item => item.id !== id));
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
      setCart(prev => prev.map(i => i.id === id ? updatedItem : i));
      try {
        await axios.put(`${API_URL}/cart/${id}`, updatedItem);
      } catch (err) { 
        console.error("Failed to update quantity in DB:", err); 
      }
    } else {
      removeFromCart(id, colorHex);
    }
  };

  // 5. THE NEW FEATURE: CLEAR CART AFTER SUCCESSFUL PAYMENT
  const clearCart = async () => {
    const itemsToDelete = [...cart];
    // Instantly empty the UI so the user sees a clean slate
    setCart([]); 
    
    // JSON server requires deleting items one by one
    try {
      await Promise.all(itemsToDelete.map(item => axios.delete(`${API_URL}/cart/${item.id}`)));
    } catch (err) {
      console.error("Failed to clear cart in DB:", err);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}

    >
      {children}
    </CartContext.Provider>
  );

};

