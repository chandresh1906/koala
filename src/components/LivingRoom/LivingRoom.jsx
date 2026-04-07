import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import TopOfferBar from "../Topoffer/TopOfferBar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ComplexProductCard from "../Products/ComplexProductCard";
import API_URL from "../../../Api_path";

const FILTER_COLORS = [
  { name: "Beige", hex: "#eaddcf" }, { name: "Black", hex: "#000000" }, { name: "Blue", hex: "#7ba4b8" },
  { name: "Bronze", hex: "#cd7f32" }, { name: "Brown", hex: "#8b4513" }, { name: "Green", hex: "#6b8e23" },
  { name: "Grey", hex: "#808080" }, { name: "Pink", hex: "#ffc0cb" }, { name: "Red", hex: "#a52a2a" },
  { name: "Silver", hex: "#c0c0c0" }, { name: "White", hex: "#ffffff" }, { name: "Yellow", hex: "#fffacd" }
];

const FILTER_SIZES = ["1.5 to 2.5-Seater", "3 to 3.5-Seater", "Modular"];

export default function LivingRoom() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  
  // Data States
  const [heroData, setHeroData] = useState(null);
  const [products, setProducts] = useState([]);
  
  // Filter/Sort States
  const [sortType, setSortType] = useState("Featured");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openSection, setOpenSection] = useState({ size: false, colour: true, price: false });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/livingRoom`).then((res) => setHeroData(res.data));
    axios.get(`${API_URL}/products`).then((res) => {
      // Show all products that belong to categories 1-10 (Living Room)
      const livingRoomProducts = res.data.filter(p => p.categoryId >= 1 && p.categoryId <= 10);
      setProducts(livingRoomProducts);
    });
  }, []);

  const getImageUrl = (imgString) => {
    if (!imgString) return "";
    if (imgString.startsWith("http")) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  // Logic Functions
  const toggleSection = (section) => setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
  const toggleSize = (size) => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  const toggleColour = (colorHex) => setSelectedColours(prev => prev.includes(colorHex) ? prev.filter(c => c !== colorHex) : [...prev, colorHex]);

  // Filtering Logic
  let filteredProducts = products.filter(product => {
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => product.subtitle.includes(size.split(" ")[0]));
    const hasMatchingVariant = product.variants.some(variant => {
      const matchesColor = selectedColours.length === 0 || selectedColours.includes(variant.hex);
      const isAboveMin = minPrice === "" || variant.price >= parseInt(minPrice);
      const isBelowMax = maxPrice === "" || variant.price <= parseInt(maxPrice);
      return matchesColor && isAboveMin && isBelowMax;
    });
    return matchesSize && hasMatchingVariant;
  });

  // Sorting Logic
  if (sortType === "Price, low to high") filteredProducts.sort((a, b) => a.variants[0].price - b.variants[0].price);
  else if (sortType === "Price, high to low") filteredProducts.sort((a, b) => b.variants[0].price - a.variants[0].price);
  else if (sortType === "Best selling") filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);

  const highestPrice = products.length > 0 ? Math.max(...products.flatMap(p => p.variants.map(v => v.price))) : 0;

  if (!heroData) return <div className="min-h-screen bg-[#f8f8f6]">Loading...</div>;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8f8f6]">
      <TopOfferBar />
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[550px]">
        <img src={getImageUrl(heroData.image)} alt={heroData.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-8 md:left-12 z-10">
          <h1 className="text-white text-[40px] md:text-[56px] font-bold">{heroData.title}</h1>
          <p className="text-white text-[18px]">{heroData.subtitle}</p>
        </div>
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-9">
        {/* Breadcrumbs */}
        <div className="py-6 text-[14px]">
          <Link to="/" className="text-gray-500 hover:underline">Home</Link>
          <span className="mx-3 text-gray-400">/</span>
          <span className="text-[#2f2e2a] font-bold">Living Room</span>
        </div>

        {/* Category Slider */}
        <section className="pb-12">
          <div ref={scrollContainerRef} className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
            {heroData.categories?.map((cat) => (
              <div key={cat.id} onClick={() => navigate(`/living-room/${cat.title.toLowerCase().replace(/ /g, '-')}`)} className="flex-shrink-0 w-[240px] cursor-pointer group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200">
                  <img src={getImageUrl(cat.image)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="mt-2 font-bold text-[#2f2e2a]">{cat.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Sort Dropdown */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-extrabold text-[#2f2e2a]">All Living Room</h2>
          <div className="flex items-center gap-3">
            <span className="text-[14px] text-gray-500">Sort by:</span>
            <div className="relative border border-gray-300 bg-white rounded-md w-[200px]">
              <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="w-full appearance-none bg-transparent py-2 px-4 text-[14px] font-bold outline-none cursor-pointer">
                <option>Featured</option><option>Best selling</option><option>Price, low to high</option><option>Price, high to low</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-10 pb-20">
          
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
            {/* Size Filter */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('size')} className="w-full flex justify-between items-center p-4 font-bold">
                Size {openSection.size ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>
              {openSection.size && (
                <div className="p-4 pt-0 flex flex-col gap-3">
                  {FILTER_SIZES.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSize(size)} className="w-5 h-5 accent-[#6e7464]" />
                      <span className="text-[14px]">{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Colour Filter */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('colour')} className="w-full flex justify-between items-center p-4 font-bold">
                Colour {openSection.colour ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>
              {openSection.colour && (
                <div className="p-4 pt-0 grid grid-cols-4 gap-4">
                  {FILTER_COLORS.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toggleColour(color.hex)}>
                      <div className={`w-8 h-8 rounded-full border shadow-sm ${selectedColours.includes(color.hex) ? 'ring-2 ring-gray-400' : ''}`} style={{ backgroundColor: color.hex }} />
                      <span className="text-[10px] text-gray-500">{color.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center p-4 font-bold">
                Price {openSection.price ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>
              {openSection.price && (
                <div className="p-4 pt-0 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input type="number" placeholder="From $" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-1/2 border p-2 rounded text-sm" />
                    <input type="number" placeholder="To $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-1/2 border p-2 rounded text-sm" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map(product => (
              <ComplexProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}