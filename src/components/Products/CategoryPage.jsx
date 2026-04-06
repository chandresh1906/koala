import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; 
import { ChevronDown, ChevronUp } from "lucide-react";
import TopOfferBar from "../Topoffer/TopOfferBar";
import Navbar from "../Navbar/Navbar"; 
import Footer from "../Footer/Footer";
import ComplexProductCard from "./ComplexProductCard"; 
import API_URL from "../../../Api_path"; 

const FILTER_COLORS = [
  { name: "Beige", hex: "#eaddcf" }, { name: "Black", hex: "#000000" }, { name: "Blue", hex: "#7ba4b8" },
  { name: "Bronze", hex: "#cd7f32" }, { name: "Brown", hex: "#8b4513" }, { name: "Green", hex: "#6b8e23" },
  { name: "Grey", hex: "#808080" }, { name: "Pink", hex: "#ffc0cb" }, { name: "Red", hex: "#a52a2a" },
  { name: "Silver", hex: "#c0c0c0" }, { name: "White", hex: "#ffffff" }, { name: "Yellow", hex: "#fffacd" }
];

const FILTER_SIZES = ["1.5 to 2.5-Seater", "3 to 3.5-Seater", "Modular"];

export default function CategoryPage() {
  const { categorySlug } = useParams();

  const [currentCategory, setCurrentCategory] = useState(null);
  const [heroImage, setHeroImage] = useState("");
  const [products, setProducts] = useState([]);
  
  const [sortType, setSortType] = useState("Featured");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openSection, setOpenSection] = useState({ size: false, colour: true, price: false });

  const toggleSection = (section) => setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));

  useEffect(() => {
    axios.get(`${API_URL}/livingRoom`).then((res) => {
      const allCategories = res.data.categories;
      const matchedCat = allCategories.find(c => 
        c.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categorySlug
      );

      if (matchedCat) {
        setCurrentCategory(matchedCat);
        setHeroImage(matchedCat.id === 1 ? res.data.image : matchedCat.image);
        
        axios.get(`${API_URL}/products`).then((prodRes) => {
          const categoryProducts = matchedCat.id === 1 
            ? prodRes.data 
            : prodRes.data.filter(p => p.categoryId === matchedCat.id);
          setProducts(categoryProducts);
        });
      }
    });
  }, [categorySlug]); 

  const getImageUrl = (imgString) => {
    if (!imgString) return "";
    if (imgString.startsWith('http')) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  const toggleSize = (size) => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  const toggleColour = (colorHex) => setSelectedColours(prev => prev.includes(colorHex) ? prev.filter(c => c !== colorHex) : [...prev, colorHex]);

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

  if (sortType === "Price, low to high") filteredProducts.sort((a, b) => a.variants[0].price - b.variants[0].price);
  else if (sortType === "Price, high to low") filteredProducts.sort((a, b) => b.variants[0].price - a.variants[0].price);
  else if (sortType === "Best selling") filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);

  const highestPrice = products.length > 0 ? Math.max(...products.flatMap(p => p.variants.map(v => v.price))) : 0;

  if (!currentCategory) return <div className="min-h-screen bg-[#f8f8f6]">Loading...</div>;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8f8f6]">
      <TopOfferBar />
      <Navbar />

      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200">
        <img src={getImageUrl(heroImage)} alt={currentCategory.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <h1 className="text-white text-[36px] md:text-[48px] font-extrabold tracking-tight mb-2">
            {currentCategory.title}
          </h1>
        </div>
      </div>

      <div className="w-full max-w-[1550px] mx-auto px-6 lg:px-9 py-6">
        <div className="text-[13px] font-medium tracking-wide mb-8 text-gray-500">
          <Link to="/" className="hover:underline text-[#2f2e2a]">Home</Link> 
          <span className="mx-3 text-gray-400">/</span> 
          <Link to="/living-room" className="hover:underline text-[#2f2e2a]">Living Room</Link>
          <span className="mx-3 text-gray-400">/</span> 
          <span className="text-[#2f2e2a]">{currentCategory.title}</span>
        </div>

        <div className="flex justify-end items-center mb-6 gap-3">
          <span className="text-[14px] text-gray-600">Sort by:</span>
          <div className="relative border border-gray-300 bg-white rounded-md w-[200px]">
            <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="w-full appearance-none bg-transparent py-2 px-4 text-[14px] font-bold text-[#2f2e2a] outline-none cursor-pointer">
              <option>Featured</option><option>Best selling</option><option>Price, low to high</option><option>Price, high to low</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-4">
            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('size')} className="w-full flex justify-between items-center p-4 font-bold text-[#2f2e2a]">
                Size {openSection.size ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
              </button>
              {openSection.size && (
                <div className="p-4 pt-0 flex flex-col gap-3">
                  {FILTER_SIZES.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSize(size)} className="w-5 h-5 rounded border-gray-300 accent-[#6e7464]" />
                      <span className="text-[14px] text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('colour')} className="w-full flex justify-between items-center p-4 font-bold text-[#2f2e2a]">
                Colour {openSection.colour ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
              </button>
              {openSection.colour && (
                <div className="p-4 pt-0">
                  <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                    {FILTER_COLORS.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => toggleColour(color.hex)}>
                        <div className={`w-8 h-8 rounded-full border shadow-sm transition-all ${selectedColours.includes(color.hex) ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-300 scale-110' : 'border-gray-200'}`} style={{ backgroundColor: color.hex }} />
                        <span className="text-[11px] text-gray-600">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white border border-[#e5e5e5] rounded-lg">
              <button onClick={() => toggleSection('price')} className="w-full flex justify-between items-center p-4 font-bold text-[#2f2e2a]">
                Price {openSection.price ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
              </button>
              {openSection.price && (
                <div className="p-4 pt-0 flex flex-col gap-3">
                  <span className="text-[13px] text-gray-500">The highest price is ${highestPrice.toLocaleString()}</span>
                  <div className="flex flex-col gap-3">
                    <div className="relative border border-gray-300 rounded-md px-3 py-2">
                      <span className="text-[12px] text-gray-500 absolute top-1">From $</span>
                      <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full outline-none pt-4 pb-1 bg-transparent text-[#2f2e2a] font-medium" />
                    </div>
                    <div className="relative border border-gray-300 rounded-md px-3 py-2">
                      <span className="text-[12px] text-gray-500 absolute top-1">To $</span>
                      <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full outline-none pt-4 pb-1 bg-transparent text-[#2f2e2a] font-medium" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => <ComplexProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500 text-lg">No products found matching your filters.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}