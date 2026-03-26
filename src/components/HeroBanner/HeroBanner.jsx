import React, { useState, useEffect } from 'react';
// The main banner image is directly imported here, so it works perfectly!
import bannerImg from "../../assets/APD_Phase2_HPHeroBanner_Static_44871f55-ea10-4b8a-8d38-66dc81352402.webp";
import axios from 'axios';

export default function HeroBanner() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/featuredCategories")
      .then((res) => res.data)
      .then((data) => setFeatured(data))
      .catch((err) => console.error("Error fetching featured categories:", err));
  }, []);

  // VITE MAGIC TRICK: This helper function correctly builds the path to your assets folder!
  const getImageUrl = (imageName) => {
    return new URL(`../../assets/${imageName}`, import.meta.url).href;
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f8f6]">
      
      {/* --- TOP: MAIN HERO IMAGE --- */}
      <section className="w-full h-[600px] md:h-[750px] bg-gray-200">
        <img 
          src={bannerImg} 
          alt="hero" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* --- BOTTOM: DYNAMIC CATEGORY GRID --- */}
      <section className="mx-auto w-full max-w-[1400px] px-9 py-16">
        
        <h2 className="text-[32px] md:text-[36px] font-extrabold text-[#2f2e2a] mb-8">
          Furniture loved by millions of homes around the world
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 cursor-pointer group">
              
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5e5e5]">
                
                {item.discount && (
                  <div className="absolute top-4 left-4 bg-[#cbf2d6] text-[#2f2e2a] text-[12px] font-bold px-3 py-1 rounded-full z-10">
                    {item.discount}
                  </div>
                )}
                
                {/* Notice how we use the getImageUrl function here! */}
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <h3 className="text-[18px] font-medium text-[#2f2e2a]">
                {item.title}
              </h3>
              
            </div>
          ))}
        </div>
        
      </section>

    </div>
  );
}