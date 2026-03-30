import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function CartDrawer({ isOpen, onClose }) {
  const [suggestions, setSuggestions] = useState([]);

  // Fetch the suggestions from your db.json when the drawer mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/cartSuggestions")
      .then((res) => setSuggestions(res.data))
      .catch((err) => console.error("Error fetching cart suggestions:", err));
  }, []);

  // Helper to dynamically load images if they are in your assets folder
  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    // If it's an external URL (http), return as is. Otherwise, map to local assets.
    if (imgString.startsWith('http')) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#f8f8f6] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header (Matching the Image) */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5e5e5]">
          <h2 className="text-[20px] font-bold text-[#2f2e2a]">Your Cart is Empty</h2>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-200 rounded-full transition cursor-pointer text-gray-500 hover:text-gray-800"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Body - 2x2 Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {suggestions.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 group cursor-pointer">
                
                {/* Image Container with light background */}
                <div className="w-full aspect-[4/3] bg-white rounded-xl overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.title} 
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                  />
                </div>
                
                {/* Title Below Image */}
                <h3 className="text-[17px] font-semibold text-[#2f2e2a]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}