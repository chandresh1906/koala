import React from 'react';
// Import the .webp file from your assets
import bannerImg from "../../assets/APD_Phase2_HPHeroBanner_Static_44871f55-ea10-4b8a-8d38-66dc81352402.webp";

export default function HeroBanner() {
  return (
    <section className="w-full h-750px bg-gray-200">
      {/* We use a simple img tag first to confirm it displays */}
      <img 
        src={bannerImg} 
        alt="hero" 
        className="w-full h-full object-cover"
        onLoad={() => console.log("Success! Image loaded.")}
        onError={() => console.log("Error: Image still not loading.")}
      />
    </section>
  );
}