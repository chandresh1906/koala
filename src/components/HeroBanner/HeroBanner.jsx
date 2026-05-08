import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from "../../../Api_path";

import bannerImg from "../../assets/APD_Phase2_HPHeroBanner_Static_44871f55-ea10-4b8a-8d38-66dc81352402.webp";

export default function HeroBanner() {
  const [featured, setFeatured] = useState([]);
  console.log('Featured categories:', featured); // Debugging log
  const [bannerData, setBannerData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [modularBannerData, setModularBannerData] = useState(null);
  const [impacts, setImpacts] = useState([]);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const [isModularPlaying, setIsModularPlaying] = useState(true);
  const modularVideoRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // We fetch all the data for the homepage here
    axios.get(`${API_URL}/categories`).then((res) => setFeatured(res.data));
    axios.get(`${API_URL}/secondaryBanner`).then((res) => setBannerData(res.data));
    axios.get(`${API_URL}/features`).then((res) => setFeatures(res.data));
    axios.get(`${API_URL}/modularBanner`).then((res) => setModularBannerData(res.data));
    axios.get(`${API_URL}/impacts`).then((res) => setImpacts(res.data));
  }, []);

  const getImageUrl = (fileName) => {
    if (!fileName) return '';
    if (fileName.startsWith('http') || fileName.startsWith('data:image')) return fileName;
    try {
      return new URL(`../../assets/${fileName}`, import.meta.url).href;
    } catch(e) {
      return '';
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleModularPlayPause = () => {
    if (modularVideoRef.current) {
      isModularPlaying ? modularVideoRef.current.pause() : modularVideoRef.current.play();
      setIsModularPlaying(!isModularPlaying);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#f8f8f6]">
      
      {/* Top Banner */}
      <section className="w-full h-[350px] sm:h-[450px] md:h-[600px] bg-gray-200">
        <img src={bannerImg} alt="hero" className="w-full h-full object-cover" />
      </section>

      {/* Featured Categories */}
      <section className="mx-auto w-full max-w-[1550px] px-5 md:px-9 py-12 md:py-16">
        <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-extrabold text-[#2f2e2a] mb-6 md:mb-8 leading-tight">
          Furniture loved by millions of homes around the world
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((item) => {
            // THE FIX: Safe extraction for old and new DB structures
            const catName = item.categoryName || item.name || item.title || "Unknown";
            const catImage = item.categoryImage || item.img || "";

            return (
              <div 
                key={item.id} 
                className="flex flex-col gap-3 md:gap-4 cursor-pointer group"
                onClick={() => {
                  // THE FIX: Dynamic routing for ALL categories
                  let slug = catName.toLowerCase().trim().replace(/ & /g, '-').replace(/ /g, '-');
                  
                  // Special check to make sure "Koala x Bluey" routes to "/bluey" cleanly
                  if (slug === 'koala-x-bluey') {
                    slug = 'bluey';
                  }

                  if (slug) {
                    navigate(`/${slug}`);
                  }
                }}
              >
                <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-[#e5e5e5]">
                  {item.discount && (
                    <div className="absolute top-3 left-3 bg-[#cbf2d6] text-[#2f2e2a] text-[10px] md:text-[12px] font-bold px-2 md:px-3 py-1 rounded-full z-10">
                      {item.discount}
                    </div>
                  )}
                  {/* Using our safe image variable & getImageUrl helper */}
                  <img src={getImageUrl(catImage)} alt={catName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-[15px] md:text-[18px] font-bold text-[#2f2e2a]">{catName}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* First Video Banner */}
      {bannerData && (
        <section className="relative w-full h-[450px] md:h-[650px] bg-gray-200 overflow-hidden">
          <video 
            ref={videoRef} src={getImageUrl(bannerData.videoUrl)} poster={getImageUrl(bannerData.posterUrl)}
            autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 mx-auto w-full max-w-[1400px]">
            <h2 className="text-white text-[28px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-3">
              {bannerData.title}
            </h2>
            <p className="text-white text-[14px] md:text-[18px] mb-6 max-w-2xl">
              {bannerData.subtitle}
            </p>
            <button className="bg-white text-[#2f2e2a] font-bold text-[14px] md:text-[16px] px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              {bannerData.buttonText}
            </button>
          </div>
          <button onClick={togglePlayPause} className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-2 border-white rounded-full flex items-center justify-center text-white">
            {isPlaying ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>}
          </button>
        </section>
      )}

      {/* Features Grid */}
      <section className="mx-auto w-full max-w-[1550px] px-5 md:px-9 py-12 md:py-16">
        <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-bold text-[#2f2e2a] mb-6 md:mb-8 leading-tight">
          Forward-thinking designs, rewriting the rules
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 md:gap-4 group">
              <div className="w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-[#e5e5e5]">
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col px-1 md:px-0">
                <h3 className="text-[15px] md:text-[18px] font-bold text-[#2f2e2a]">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-[14px] text-gray-600 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Second Video Banner */}
      {modularBannerData && (
        <section className="relative w-full h-[450px] md:h-[650px] bg-gray-200 overflow-hidden">
          <video 
            ref={modularVideoRef} src={getImageUrl(modularBannerData.videoUrl)} poster={getImageUrl(modularBannerData.posterUrl)}
            autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 mx-auto w-full max-w-[1400px]">
            <h2 className="text-white text-[28px] md:text-[48px] lg:text-[56px] font-bold leading-tight mb-3">
              {modularBannerData.title}
            </h2>
            <p className="text-white text-[14px] md:text-[18px] mb-6 max-w-2xl">{modularBannerData.subtitle}</p>
            <button className="bg-white text-[#2f2e2a] font-bold text-[14px] md:text-[16px] px-6 py-3 rounded-full hover:bg-gray-100 shadow-lg">
              {modularBannerData.buttonText}
            </button>
          </div>
          <button onClick={toggleModularPlayPause} className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-10 md:h-10 border-2 border-white rounded-full flex items-center justify-center text-white">
            {isModularPlaying ? <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>}
          </button>
        </section>
      )}

      {/* Section Header */}
      <section className="mx-auto w-full max-w-[1500px] px-5 md:px-9 py-12 md:py-16">
        <div className="mb-6 md:mb-10">
          <span className="text-[#2f2e2a] font-bold text-[11px] md:text-[15px] mb-2 block uppercase tracking-wider">
            Why Koala?
          </span>
          <h2 className="text-[24px] md:text-[40px] font-bold text-[#2f2e2a] leading-tight">
            For a cosy home, and a healthy planet.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {impacts.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 md:gap-4 group cursor-pointer">
              <div className="w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-[#e5e5e5]">
                <img 
                  src={getImageUrl(item.img)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col px-1 md:pr-4">
                <h3 className="text-[15px] md:text-[18px] font-bold text-[#2f2e2a] mb-0.5 md:mb-1">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-[14px] text-gray-600 leading-relaxed">
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