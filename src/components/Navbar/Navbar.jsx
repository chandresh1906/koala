import { ChevronDown, Search, UserCircle2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./productCard"; // Make sure the capitalization matches your file!
import axios from "axios";

export default function Navbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <nav className="relative w-full border-b border-[#e5e5e5] bg-[#f8f8f6] z-40">
      <div className="flex w-full items-center justify-between px-9 py-5">
        
        {/* Logo (Left) */}
        <div className="flex items-center cursor-pointer">
          <h1 className="text-[56px] leading-none font-extrabold tracking-tight text-[#6d7562]">
            koala
          </h1>
          <span className="ml-1 mt-6 text-[#6d7562] text-sm">®</span>
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-8 text-[18px] font-medium text-[#222] h-full">
          
          {/* Static: Shop Sale Button */}
          <button className="rounded-full bg-[#cbf2d6] px-5 py-1.5 text-[15px] font-bold text-[#2f2e2a] hover:bg-[#b5e6c2] transition cursor-pointer">
            Shop Sale
          </button>

          {/* Dynamic Categories (Living Room, Bedroom, Outdoor) */}
          {categories.map((cat) => (
            <div key={cat.name} className="group flex items-center h-[80px] -my-[30px] cursor-pointer">
              
              <div className="flex items-center gap-1">
                <span className="group-hover:text-[#55705d] border-b-2 border-transparent group-hover:border-[#55705d] pb-0.5 transition-all font-semibold">
                  {cat.name}
                </span>
                <ChevronDown
                  size={18}
                  className="group-hover:rotate-180 transition-transform duration-300 text-[#2f2e2a]"
                />
              </div>

              {/* Mega Menu Dropdown */}
              <div className="absolute left-0 top-full w-full bg-[#f8f8f6] border-t border-[#e5e5e5] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="w-full px-9 py-10 flex flex-col gap-8">
                  
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-[32px] font-extrabold text-[#2f2e2a]">
                      {cat.name}
                    </h2>
                    <button className="rounded-full bg-[#69705b] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#525845] transition">
                      Shop all {cat.name.toLowerCase()}
                    </button>
                  </div>

                  {/* Maps to the new ProductCard UI */}
                  <div className="grid grid-cols-7 gap-4 w-full">
                    {cat.items?.map((item) => (
                      <ProductCard
                        key={item.id}
                        title={item.title}
                        img={item.img}
                        discount={item.discount}
                      />
                    ))}
                  </div>
                  
                </div>
              </div>
            </div>
          ))}

          {/* Static: BLUEY LOGO */}
          <div className="group flex items-center h-[80px] -my-[30px] cursor-pointer">
            <div className="flex items-center gap-1 hover:opacity-80 transition">
              <span className="text-[#5a6fa8] text-[28px] font-extrabold lowercase">
                <img
                  src="https://au.koala.com/cdn/shop/files/Logo_3.svg?v=1760480610&width=146"
                  alt="Bluey Logo"
                  className="inline-block w-[60px] h-auto -mt-1"
                />
              </span>
              <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-300 text-[#2f2e2a]" />
            </div>

            <div className="absolute left-0 top-full w-full bg-[#f8f8f6] border-t border-[#e5e5e5] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="w-full px-9 py-10 flex flex-col gap-8">
                 <div className="flex justify-between items-center w-full">
                    <h2 className="text-[32px] font-extrabold text-[#2f2e2a]">Koala x Bluey</h2>
                    <button className="rounded-full bg-[#69705b] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#525845] transition">
                      Shop Koala x Bluey
                    </button>
                  </div>

                <div className="grid grid-cols-7 gap-4 w-full">
                  {/* Hardcoded Bluey Item Example using ProductCard */}
                  <ProductCard 
                    title="Playtime Sofa Bed" 
                    img="https://via.placeholder.com/150" 
                    discount="20% off" 
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-5 text-[#2f2e2a]">
          <button className="hover:scale-110 transition cursor-pointer">
            <Search size={24} strokeWidth={2} />
          </button>
          <button className="hover:scale-110 transition cursor-pointer">
            <UserCircle2 size={26} strokeWidth={2} />
          </button>
          <button className="hover:scale-110 transition cursor-pointer">
            <ShoppingCart size={26} strokeWidth={2} />
          </button>
        </div>

      </div>
    </nav>
  );
}