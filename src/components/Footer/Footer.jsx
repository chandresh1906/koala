import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer() {
  const [footerLogos, setFooterLogos] = useState([]);

  useEffect(() => {
    // Fetch Footer Logos
    axios
      .get("http://localhost:5000/footerLogos")
      .then((res) => setFooterLogos(res.data))
      .catch((err) => console.error("Error fetching footer logos:", err));
  }, []);

  const getImageUrl = (fileName) => {
    if (!fileName) return '';
    return new URL(`../../assets/${fileName}`, import.meta.url).href;
  };

  return (
    <footer className="w-full bg-[#6a735c] text-white pt-20 pb-12">
      <div className="mx-auto w-full max-w-[1440px] px-8 lg:px-12">
        
        {/* Top Section: Logo, Acknowledgment, and Links Grid */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Left Column: Logo and Acknowledgment */}
          <div className="w-full lg:w-[35%] pr-4">
            <h2 className="text-[44px] font-bold mb-8 tracking-tight leading-none">
              ko<span className="relative inline-block">a<span className="absolute -top-3 left-1 text-2xl">'</span></span>la<span className="text-sm align-super ml-1 font-normal">®</span>
            </h2>
            <p className="text-[15px] leading-[1.6] mb-6 font-medium tracking-wide">
              In the spirit of reconciliation, Koala acknowledges the Traditional Custodians of Country throughout Australia and their connections to land, sea and community.
            </p>
            <p className="text-[15px] leading-[1.6] mb-8 font-medium tracking-wide">
              We pay our respect to their Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples today.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
               <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:opacity-80">
                 <span className="font-bold text-xs">f</span>
               </div>
               <div className="w-6 h-6 border-2 border-white rounded-[6px] flex items-center justify-center cursor-pointer hover:opacity-80">
                 <div className="w-2.5 h-2.5 border-2 border-white rounded-full"></div>
               </div>
            </div>

            {/* FIXED: 3 Distinct Logos Row */}
            <div className="flex items-center gap-8 mt-10">
               {footerLogos.map((logo) => (
                 <img 
                   key={logo.id} 
                   src={getImageUrl(logo.img)} 
                   alt={logo.alt} 
                   className="h-14 md:h-16 w-auto object-contain" 
                 />
               ))}
            </div>
          </div>
          
          {/* Right Side: Links Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Help */}
            <div>
              <h3 className="text-[18px] font-bold mb-8">Help</h3>
              <ul className="space-y-5 text-[15px] font-medium tracking-wide">
                <li><a href="#" className="hover:underline">Request delivery change</a></li>
                <li><a href="#" className="hover:underline">Contact & FAQs</a></li>
                <li><a href="#" className="hover:underline">Finance options</a></li>
                <li><a href="#" className="hover:underline">My Account</a></li>
              </ul>
            </div>
            
            {/* Column 2: About */}
            <div>
              <h3 className="text-[18px] font-bold mb-8">About</h3>
              <ul className="space-y-5 text-[15px] font-medium tracking-wide">
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Our impact</a></li>
                <li><a href="#" className="hover:underline">Innovation</a></li>
                <li><a href="#" className="hover:underline">Trade & Commercial</a></li>
                <li><a href="#" className="hover:underline">Koala Second Home</a></li>
                <li><a href="#" className="hover:underline">Koala Showroom</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="mailto:press@koala.com" className="hover:underline">press@koala.com</a></li>
              </ul>
            </div>
            
            {/* Column 3: Resources */}
            <div>
              <h3 className="text-[18px] font-bold mb-8">Resources</h3>
              <ul className="space-y-5 text-[15px] font-medium tracking-wide">
                <li><a href="#" className="hover:underline">Delivery</a></li>
                <li><a href="#" className="hover:underline">120 day trial</a></li>
                <li><a href="#" className="hover:underline">Warranty</a></li>
                <li><a href="#" className="hover:underline">Treetops blog</a></li>
                <li><a href="#" className="hover:underline">Refer a friend</a></li>
                <li><a href="#" className="hover:underline">Compare Koala</a></li>
                <li><a href="#" className="hover:underline">Student discount</a></li>
              </ul>
            </div>
            
            {/* Column 4: Shop */}
            <div>
              <h3 className="text-[18px] font-bold mb-8">Shop</h3>
              <ul className="space-y-5 text-[15px] font-medium tracking-wide">
                <li><a href="#" className="hover:underline">Mattresses</a></li>
                <li><a href="#" className="hover:underline">Sofa Beds</a></li>
                <li><a href="#" className="hover:underline">Sofas</a></li>
                <li><a href="#" className="hover:underline">Bedroom</a></li>
                <li><a href="#" className="hover:underline">Living Room</a></li>
                <li><a href="#" className="hover:underline">Outdoor</a></li>
                <li><a href="#" className="hover:underline leading-snug block">Koala x Bluey Playtime Collection</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Section: Legal and Payment */}
        <div className="border-t-[0.5px] border-white/40 pt-6 flex flex-col md:flex-row justify-between items-center text-[14px] font-medium tracking-wide relative">
          
          {/* Left: Copyright & Links */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-4 md:mb-0">
            <span>© 2026 Koala</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Website Terms</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Promotion Terms</a>
          </div>
          
          {/* Right: Payment Icons */}
          <div className="flex gap-2.5 items-center mr-16">
             <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-blue-800 font-bold">PayPal</div>
             <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[9px] text-blue-900 font-bold italic">VISA</div>
             <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-90 -mr-1"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-90"></div>
             </div>
             <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-[8px] text-white font-bold border border-white/20">AMEX</div>
             <div className="w-10 h-6 bg-[#b2fce4] rounded flex items-center justify-center text-[10px] text-black font-bold">~</div>
             <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[10px] text-indigo-900 font-black italic pr-1">zip</div>
          </div>

          {/* Floating Chat Button */}
          <button className="absolute right-0 -top-4 w-14 h-14 bg-white rounded-full flex justify-center items-center shadow-lg hover:bg-gray-100 transition z-50 group">
             <div className="flex gap-1">
               <span className="w-1.5 h-1.5 bg-[#6a735c] rounded-full"></span>
               <span className="w-1.5 h-1.5 bg-[#6a735c] rounded-full"></span>
               <span className="w-1.5 h-1.5 bg-[#6a735c] rounded-full"></span>
             </div>
          </button>
          
        </div>
      </div>
    </footer>
  );
}