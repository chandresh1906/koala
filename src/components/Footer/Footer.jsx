import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FOOTER_LINKS, LEGAL_LINKS, PAYMENT_METHODS } from './footerConfig';
import API_URL from '../../../Api_path';

export default function Footer() {
  const [footerLogos, setFooterLogos] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/footerLogos`)
      .then((res) => setFooterLogos(res.data))
      .catch((err) => console.error("Error fetching footer logos:", err));
  }, []);

  const getImageUrl = (fileName) => fileName ? new URL(`../../assets/${fileName}`, import.meta.url).href : '';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#6a735c] text-white pt-12 md:pt-20 pb-10 md:pb-12" style={{ fontFamily: '"Euclid Circular B", sans-serif' }}>
      <div className="mx-auto w-full max-w-[1550px] px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-12 md:gap-16 mb-16 md:mb-24">
          
          {/* Brand Column */}
          <div className="w-full lg:w-[35%] pr-0 lg:pr-4">
            <h2 className="text-[40px] md:text-[44px] font-bold mb-6 md:mb-8 tracking-tight leading-none">
              ko<span className="relative inline-block">a<span className="absolute -top-3 left-1 text-2xl"></span></span>la<span className="text-sm align-super ml-1 font-normal">®</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-[14px] md:text-[15px] leading-[1.6] font-medium tracking-wide">
              <p>In the spirit of reconciliation, Koala acknowledges the Traditional Custodians of Country throughout Australia and their connections to land, sea and community.</p>
              <p>We pay our respect to their Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples today.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-8 mt-8 md:mt-10">
               {footerLogos.map((logo) => (
                 <img key={logo.id} src={getImageUrl(logo.img)} alt={logo.alt} className="h-12 md:h-16 w-auto object-contain" />
               ))}
            </div>
          </div>
          
          {/* Mapped Links Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            {FOOTER_LINKS.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-[16px] md:text-[18px] font-bold mb-4 md:mb-8">{section.title}</h3>
                <ul className="space-y-4 md:space-y-5 text-[14px] md:text-[15px] font-medium tracking-wide">
                  {section.links.map((item, lIdx) => {
                    const isObj = typeof item === 'object';
                    return (
                      <li key={lIdx}>
                        <a href={isObj && item.url ? item.url : '#'} className={`hover:underline ${isObj && item.className ? item.className : ''}`}>
                          {isObj ? item.label : item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/30 pt-6 md:pt-8 flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center text-[12px] md:text-[14px] font-medium tracking-wide gap-6 lg:gap-0">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 w-full lg:w-auto">
            <span className="font-bold">© {currentYear} Koala</span>
            {LEGAL_LINKS.map((link, idx) => (
              <a key={idx} href="#" className="hover:underline text-gray-200 hover:text-white">{link}</a>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2.5 items-center w-full lg:w-auto">
            {PAYMENT_METHODS.map(method => (
              <div key={method.id} className={`w-10 h-6 rounded flex items-center justify-center font-bold text-[10px] ${method.classes}`}>
                {method.content}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </footer>
  );
}