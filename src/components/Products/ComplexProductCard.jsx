import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function ComplexProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const variant = product.variants[selectedVariantIdx];
  const images = variant?.images || [];

  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="flex flex-col group cursor-pointer w-full"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative w-full aspect-[4/3] bg-[#f5f5f5] rounded-xl overflow-hidden mb-4">
        {product.badge && (
          <div 
            className="absolute top-3 left-3 text-[#2f2e2a] text-[12px] font-bold px-3 py-1 rounded-full z-10"
            style={{ backgroundColor: product.badgeColor || '#d9f0d8' }}
          >
            {product.badge}
          </div>
        )}

        <img 
          src={getImageUrl(images[currentImgIdx])} 
          alt={product.title} 
          className="w-full h-full object-contain p-4"
        />

        {images.length > 1 && (
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button onClick={prevImage} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button onClick={nextImage} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <div key={idx} className={`w-2 h-2 rounded-full ${currentImgIdx === idx ? 'bg-gray-500' : 'bg-gray-300'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#2f2e2a" : "none"} stroke="#2f2e2a" strokeWidth={1.5} />
            ))}
          </div>
          <span className="text-[13px] font-bold text-[#2f2e2a] ml-1">{product.rating}</span>
          <span className="text-[13px] text-gray-500">({product.reviewCount})</span>
        </div>

        <h3 className="text-[16px] font-bold text-[#2f2e2a] mt-1">{product.title}</h3>
        <p className="text-[14px] text-gray-500">{product.subtitle}</p>

        <div className="text-[15px] font-medium text-[#2f2e2a] mt-2">
          From ${variant?.price.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {product.variants.map((v, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedVariantIdx(idx);
                setCurrentImgIdx(0);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all ${selectedVariantIdx === idx ? 'border-gray-900 scale-110' : 'border-gray-300 border-opacity-50 hover:scale-105'}`}
              style={{ backgroundColor: v.hex }}
              title={v.colorName}
            />
          ))}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, variant);
          }}
          className="mt-4 w-full bg-[#6e7464] text-white font-bold text-[14px] py-3 rounded-full hover:bg-[#5a5f52] transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}