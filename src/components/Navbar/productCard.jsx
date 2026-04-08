import React from 'react';

// Added onClick to the props
function ProductCard({ title, img, discount, onClick }) {
  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    if (imgString.startsWith('http')) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  return (
    // Attached onClick here
    <div onClick={onClick} className="flex flex-col items-center gap-3 cursor-pointer group/card">
      <div className="w-full bg-white border border-[#e5e5e5] rounded-[10px] flex flex-col items-center p-4 min-h-[200px] justify-center">
        {discount && (
          <div className="self-start mb-2 bg-[#cbf2d6] text-[#2f2e2a] text-[11px] font-bold px-2 py-1 rounded-full">
            {discount}
          </div>
        )}
        <img
          src={getImageUrl(img)}
          alt={title}
          className="w-full h-40 object-contain group-hover/card:scale-105 transition-transform duration-300 p-2"
        />
      </div>
      <span className="text-[14px] font-bold text-[#2f2e2a] text-center leading-tight">
        {title}
      </span>
    </div>
  );
}

export default ProductCard;