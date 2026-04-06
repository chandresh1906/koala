import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"; 
import LivingRoom from "./components/LivingRoom/LivingRoom"; 
import CategoryPage from "./components/Products/CategoryPage"; 
import ProductDetails from "./components/Products/ProductDetails"; 
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer/CartDrawer"; 

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartDrawer /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/living-room" element={<LivingRoom />} />
          <Route path="/living-room/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}