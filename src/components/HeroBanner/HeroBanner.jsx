import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// Keep your top hero image import
import bannerImg from "../../assets/APD_Phase2_HPHeroBanner_Static_44871f55-ea10-4b8a-8d38-66dc81352402.webp";

export default function HeroBanner() {
  const [featured, setFeatured] = useState([]);
  const [bannerData, setBannerData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [modularBannerData, setModularBannerData] = useState(null);
  
  // NEW: State for the Impact section
  const [impacts, setImpacts] = useState([]);
  
  // Controls for First Video
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  // Controls for Second Video
  const [isModularPlaying, setIsModularPlaying] = useState(true);
  const modularVideoRef = useRef(null);

  useEffect(() => {
    // Fetch Categories
    axios
      .get("http://localhost:5000/featuredCategories")
      .then((res) => setFeatured(res.data))
      .catch((err) => console.error("Error fetching featured categories:", err));

    // Fetch First Video Banner
    axios
      .get("http://localhost:5000/secondaryBanner")
      .then((res) => setBannerData(res.data))
      .catch((err) => console.error("Error fetching banner data:", err));

    // Fetch Features Data
    axios
      .get("http://localhost:5000/features")
      .then((res) => setFeatures(res.data))
      .catch((err) => console.error("Error fetching features:", err));

    // Fetch Second Video Banner
    axios
      .get("http://localhost:5000/modularBanner")
      .then((res) => setModularBannerData(res.data))
      .catch((err) => console.error("Error fetching modular banner data:", err));

    // NEW: Fetch Impacts Data
    axios
      .get("http://localhost:5000/impacts")
      .then((res) => setImpacts(res.data))
      .catch((err) => console.error("Error fetching impacts data:", err));
  }, []);

  const getImageUrl = (fileName) => {
    if (!fileName) return '';
    return new URL(`../../assets/${fileName}`, import.meta.url).href;
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleModularPlayPause = () => {
    if (modularVideoRef.current) {
      if (isModularPlaying) {
        modularVideoRef.current.pause();
      } else {
        modularVideoRef.current.play();
      }
      setIsModularPlaying(!isModularPlaying);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f8f6]">
      
      {/* --- TOP: ORIGINAL HERO IMAGE --- */}
      <section className="w-full h-[600px] md:h-[600px] bg-gray-200">
        <img 
          src={bannerImg} 
          alt="hero" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* --- MIDDLE 1: DYNAMIC CATEGORY GRID --- */}
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

      {/* --- MIDDLE 2: FIRST VIDEO BANNER --- */}
      {bannerData && (
        <section className="relative w-full h-[500px] md:h-[650px] bg-gray-200 overflow-hidden">
          <video 
            ref={videoRef}
            src={getImageUrl(bannerData.videoUrl)}
            poster={getImageUrl(bannerData.posterUrl)}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 mx-auto w-full max-w-[1400px]">
            <h2 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-3">
              {bannerData.title}
            </h2>
            <p className="text-white text-[16px] md:text-[18px] mb-8 max-w-2xl">
              {bannerData.subtitle}
            </p>
            <button className="bg-white text-[#2f2e2a] font-semibold text-[16px] px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              {bannerData.buttonText}
            </button>
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-4">
            <button 
              onClick={togglePlayPause}
              className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition text-white"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          </div>
        </section>
      )}

      {/* --- MIDDLE 3: FEATURES GRID --- */}
      <section className="mx-auto w-full max-w-[1400px] px-9 py-16">
        <h2 className="text-[28px] md:text-[36px] font-bold text-[#2f2e2a] mb-8">
          Forward-thinking designs, rewriting the rules for modern homes
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 group">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#e5e5e5]">
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-bold text-[#2f2e2a]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MIDDLE 4: SECOND VIDEO BANNER --- */}
      {modularBannerData && (
        <section className="relative w-full h-[500px] md:h-[650px] bg-gray-200 overflow-hidden">
          <video 
            ref={modularVideoRef}
            src={getImageUrl(modularBannerData.videoUrl)}
            poster={getImageUrl(modularBannerData.posterUrl)}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 mx-auto w-full max-w-[1400px]">
            <h2 className="text-white text-[32px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-3">
              {modularBannerData.title}
            </h2>
            <p className="text-white text-[16px] md:text-[18px] mb-8 max-w-2xl">
              {modularBannerData.subtitle}
            </p>
            <button className="bg-white text-[#2f2e2a] font-semibold text-[16px] px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
              {modularBannerData.buttonText}
            </button>
          </div>
          <div className="absolute bottom-6 right-6 flex items-center gap-4">
            <button 
              onClick={toggleModularPlayPause}
              className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition text-white"
            >
              {isModularPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          </div>
        </section>
      )}

      {/* --- BOTTOM: NEW IMPACT / WHY KOALA SECTION --- */}
      <section className="mx-auto w-full max-w-[1400px] px-9 py-16">
        
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-[#2f2e2a] text-[14px] md:text-[16px] mb-2 block">
            Why Koala?
          </span>
          <h2 className="text-[32px] md:text-[44px] font-bold text-[#2f2e2a] leading-tight">
            For a cosy home, and a healthy planet.
          </h2>
        </div>
        
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {impacts.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 group cursor-pointer">
              
              {/* Image Container */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#e5e5e5]">
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col pr-4">
                <h3 className="text-[16px] font-bold text-[#2f2e2a] mb-1">
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>
        
      </section>

    </div>
  );
}