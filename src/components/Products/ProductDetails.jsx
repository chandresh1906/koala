import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Star, Truck, ShieldCheck, CalendarHeart } from "lucide-react";
import TopOfferBar from "../Topoffer/TopOfferBar";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../../context/CartContext";
import API_URL from "../../../Api_path";

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.sizes && res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [productId]);

  const getImageUrl = (imgString) => {
    if (!imgString) return '';
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  if (!product) return <div className="min-h-screen bg-[#f8f8f6] pt-20 text-center font-bold">Loading product...</div>;

  const variant = product.variants[selectedVariantIdx];

  return (
    <div className="w-full min-h-screen bg-[#f8f8f6]">
      <TopOfferBar />
      <Navbar />

      <div className="w-full max-w-[1550px] mx-auto px-6 lg:px-12 py-8">
        <div className="text-[13px] font-medium tracking-wide mb-8 text-gray-500">
          <Link to="/" className="hover:underline text-[#2f2e2a]">Home</Link> / 
          <Link to="/living-room" className="hover:underline text-[#2f2e2a] ml-2">Living Room</Link> / 
          <span className="ml-2">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-[#f5f5f5] rounded-xl overflow-hidden relative">
              {product.badge && (
                <div className="absolute top-4 left-4 text-[#2f2e2a] text-[13px] font-bold px-4 py-1.5 rounded-full z-10" style={{ backgroundColor: product.badgeColor || '#d9f0d8' }}>
                  {product.badge}
                </div>
              )}
              <img src={getImageUrl(variant.images[0])} alt={product.title} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#2f2e2a] leading-tight">
              {product.title} <span className="text-[20px] text-gray-500 font-normal align-middle">{product.subtitle}</span>
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#2f2e2a" : "none"} stroke="#2f2e2a" strokeWidth={1.5} />
                ))}
              </div>
              <span className="text-[14px] text-gray-600 underline cursor-pointer">({product.reviewCount} Reviews)</span>
            </div>

            <div className="text-[28px] font-bold text-[#2f2e2a] mt-6">
              ${variant?.price.toLocaleString()}
            </div>

            <div className="bg-[#fdf7e3] text-[#2f2e2a] font-bold text-[14px] px-4 py-2.5 rounded-full inline-flex self-start mt-4 mb-8 cursor-pointer hover:bg-[#faeebb]">
              Sign up to get 10% off ›
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-bold text-[#2f2e2a]">Size: <span className="font-normal">{selectedSize}</span></span>
                  <span className="text-[13px] underline text-gray-500 cursor-pointer">Dimensions ⓘ</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 text-[13px] font-medium border rounded-lg transition-all ${selectedSize === size ? 'border-gray-900 bg-white ring-1 ring-gray-900' : 'border-gray-300 bg-white hover:border-gray-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-8">
              <span className="text-[14px] font-bold text-[#2f2e2a]">Colour: <span className="font-normal">{variant.colorName}</span></span>
              <div className="flex items-center gap-3 flex-wrap">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${selectedVariantIdx === idx ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-300' : 'border-gray-300 hover:border-gray-500'}`}
                    style={{ backgroundColor: v.hex }}
                    title={v.colorName}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={() => addToCart(product, variant)}
              className="w-full bg-[#6a735c] text-white font-bold text-[16px] py-4 rounded-full hover:bg-[#58614a] transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Add to cart • ${variant?.price.toLocaleString()}
            </button>

            <div className="flex items-center justify-between mt-6 text-[13px] text-gray-600 font-medium px-2">
              <div className="flex items-center gap-1.5"><CalendarHeart size={16} /> 120 day trial</div>
              <div className="flex items-center gap-1.5"><Truck size={16} /> Fast & flexible delivery</div>
              <div className="flex items-center gap-1.5"><ShieldCheck size={16} /> 5-year warranty</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}