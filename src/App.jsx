import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 
import LivingRoom from "./components/LivingRoom/LivingRoom"; 
import CategoryPage from "./components/Products/CategoryPage"; 
import ProductDetails from "./components/Products/ProductDetails"; 
import { CartProvider } from "./context/CartContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import CartDrawer from "./components/CartDrawer/CartDrawer"; 

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
      <BrowserRouter>
        <CartDrawer /> 
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* THE FIX: These two lines handle EVERY category and sub-category! */}
          {/* Handles: /living-room, /bedroom, /outdoor, /bluey */}
          <Route path="/:mainCategory" element={<LivingRoom />} />
          
          {/* Handles: /living-room/sofas, /bedroom/mattresses, etc. */}
          <Route path="/:parentCategory/:categorySlug" element={<CategoryPage />} />
          
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </CurrencyProvider>
  );
}