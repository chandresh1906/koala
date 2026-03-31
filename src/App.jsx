import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"; 
import LivingRoom from "./components/LivingRoom/LivingRoom"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/living-room" element={<LivingRoom />} />
      </Routes>
    </BrowserRouter>
  );
}