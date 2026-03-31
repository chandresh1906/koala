import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FOOTER_LINKS, LEGAL_LINKS, PAYMENT_METHODS } from './footerConfig';
import API_URL from '../../../Api_path'
export default function Footer() {
  const [footerLogos, setFooterLogos] = useState([]);
console.log('FooterLogos:', footerLogos); // Debugging log to check the fetched logos
  useEffect(() => {
    axios.get(`${API_URL}/footerLogos`)
      .then((res) => setFooterLogos(res.data))
      .catch((err) => console.error("Error fetching footer logos:", err));
  }, []);

  const getImageUrl = (fileName) => fileName ? new URL(`../../assets/${fileName}`, import.meta.url).href : '';

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full bg-[#6a735c] text-white pt-20 pb-12"
      style={{ fontFamily: '"Euclid Circular B", sans-serif' }}
    >
      {/* Fixed: Comment is safely inside the footer now! Also fixed the max-w warning. */}
      <div className="mx-auto w-full max-w-[90] px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          {/* Brand Column */}
          <div className="w-full lg:w-[35%] pr-4">
            <h2 className="text-[44px] font-bold mb-8 tracking-tight leading-none">
              ko<span className="relative inline-block">a<span className="absolute -top-3 left-1 text-2xl"></span></span>la<span className="text-sm align-super ml-1 font-normal">®</span>
            </h2>
            <div className="space-y-6 text-[15px] leading-[1.6] font-medium tracking-wide">
              <p>In the spirit of reconciliation, Koala acknowledges the Traditional Custodians of Country throughout Australia and their connections to land, sea and community.</p>
              <p>We pay our respect to their Elders past and present and extend that respect to all Aboriginal and Torres Strait Islander peoples today.</p>
            </div>
            
            {/* Logos */}
            <div className="flex items-center gap-8 mt-10">
               {footerLogos.map((logo) => (
                 <img key={logo.id} src={getImageUrl(logo.img)} alt={logo.alt} className="h-14 md:h-16 w-auto object-contain" />
               ))}
            </div>
          </div>
          
          {/* Mapped Links Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-[18px] font-bold mb-8">{section.title}</h3>
                <ul className="space-y-5 text-[15px] font-medium tracking-wide">
                  {section.links.map((item, lIdx) => {
                    const isObj = typeof item === 'object';
                    const label = isObj ? item.label : item;
                    const url = isObj && item.url ? item.url : '#';
                    const customClass = isObj && item.className ? item.className : '';
                    
                    return (
                      <li key={lIdx}>
                        <a href={url} className={`hover:underline ${customClass}`}>{label}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t-[0.5px] border-white/40 pt-6 flex flex-col md:flex-row justify-between items-center text-[14px] font-medium tracking-wide">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-4 md:mb-0">
            <span>© {currentYear} Koala</span>
            {LEGAL_LINKS.map((link, idx) => (
              <a key={idx} href="#" className="hover:underline">{link}</a>
            ))}
          </div>
          
          {/* Mapped Payment Icons */}
          <div className="flex gap-2.5 items-center mr-16">
            {PAYMENT_METHODS.map(method => (
              <div key={method.id} className={`w-10 h-6 rounded flex items-center justify-center font-bold ${method.classes}`}>
                {method.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}