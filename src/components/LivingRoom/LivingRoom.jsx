import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopOfferBar from "../Topoffer/TopOfferBar";
import Navbar from "../Navbar/Navbar"; // Adjust this path if needed
import API_URL from "../../../Api_path"; // Adjust this path if needed

export default function LivingRoom() {
  const [heroData, setHeroData] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Refs and state for the custom horizontal scrollbar
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Fetch the big Hero Banner data
    axios
      .get(`${API_URL}/livingRoomHero`)
      .then((res) => setHeroData(res.data))
      .catch((err) => console.error("Error fetching living room hero:", err));

    // 2. Fetch the 10 Categories for the slider
    axios
      .get(`${API_URL}/livingRoomCategories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Helper to load images from assets or URLs
  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    if (imgString.startsWith('http')) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  // Calculates how far the user has scrolled to move the green indicator bar
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const progress = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;
      setScrollProgress(progress);
    }
  };

  // Prevent rendering until the main hero data loads
  if (!heroData) return <div className="min-h-screen bg-[#f8f8f6]">Loading...</div>;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8f8f6]">
      
      {/* --- 1. NAVBAR --- */}
      <Navbar />

      {/* --- 2. HERO BANNER (Top) --- */}
      <div className="relative w-full h-[400px] md:h-[550px] bg-gray-200">
        <img 
          src={getImageUrl(heroData.image)} 
          alt={heroData.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Text Container aligned to bottom-left */}
        <div className="absolute bottom-10 left-8 md:bottom-16 md:left-12 z-10">
          <h1 className="text-white text-[40px] md:text-[56px] font-bold leading-tight mb-2 tracking-tight">
            {heroData.title}
          </h1>
          <p className="text-white text-[16px] md:text-[18px] font-medium">
            {heroData.subtitle}
          </p>
        </div>
      </div>

      {/* --- 3. BREADCRUMBS --- */}
      <div className="w-full max-w-[1550px] mx-auto px-9 py-6 text-[14px] font-medium">
        <Link to="/" className="hover:underline text-gray-800">Home</Link>
        <span className="mx-3 text-gray-400">/</span>
        <span className="text-[#2f2e2a]">Living Room</span>
      </div>

      {/* --- 4. CATEGORY SLIDER (Below Hero) --- */}
      <section className="w-full max-w-[1550px] mx-auto px-9 pb-12 overflow-hidden">
        
        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hides default scrollbar
        >
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className="flex-shrink-0 flex flex-col gap-3 cursor-pointer group snap-start w-[220px] md:w-[260px]"
            >
              {/* Image Box - First item gets the active dark green border */}
              <div className={`w-full aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${index === 0 ? 'border-2 border-[#525845] shadow-sm' : 'border border-[#e5e5e5] hover:border-gray-400'}`}>
                <img 
                  src={getImageUrl(cat.image)} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="text-[15px] font-bold text-[#2f2e2a]">
                {cat.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Custom Green Scrollbar Indicator */}
        <div className="w-full h-[3px] bg-gray-200 mt-2 relative rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#69705b] rounded-full transition-transform duration-75 ease-out"
            style={{ 
              width: '25%', // Width of the green scroll thumb
              transform: `translateX(${scrollProgress * (100 / 0.25 - 100)}%)` 
            }}
          ></div>
        </div>

      </section>

    </div>
  );
}