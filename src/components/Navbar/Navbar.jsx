import { ChevronDown, Search, UserCircle2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ProductCard from "./productCard"; 
import axios from "axios";
import { useCart } from "../../context/CartContext";
import API_URL from "../../../Api_path"; 

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate(); 
  
  // THE FIX: React state to control which menu is open
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);
  
  return (
    <> 
      <nav className="relative w-full height-[48px] border-b border-[#e5e5e5] bg-[#f8f8f6] z-40">
        <div className="flex w-full items-center justify-between px-8 py-4">
          
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-[44px] md:text-[50px] leading-none font-extrabold tracking-tight text-[#69705b]">
              koala
            </h1>
            <span className="ml-1 mt-5 text-[#69705b] text-xs font-bold">®</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-[16px] font-semibold text-[#2f2e2a] h-full">
            
            <button className="rounded-full bg-[#cbf2d6] px-5 py-2 text-[14px] font-bold text-[#2f2e2a] hover:bg-[#b5e6c2] transition cursor-pointer">
              Shop Sale
            </button>

            {categories.map((cat) => {
              const parentSlug = cat.name.toLowerCase().replace(/ /g, "-");

              return (
                <div 
                  key={cat.name} 
                  className="group flex items-center h-[80px] -my-[30px] cursor-pointer"
                  onMouseEnter={() => setActiveMenu(cat.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  
                  <div className="flex items-center gap-1.5" onClick={() => { setActiveMenu(null); navigate(`/${parentSlug}`); }}>
                    <span className="group-hover:text-[#69705b] border-b-2 border-transparent group-hover:border-[#69705b] pb-0.5 transition-all">
                      {cat.name}
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      className="group-hover:rotate-180 transition-transform duration-300 text-[#2f2e2a] mt-0.5"
                    />
                  </div>

                  {/* Replaced group-hover with dynamic React State logic */}
                  <div className={`absolute left-0 top-full w-full bg-[#f8f8f6] border-t border-[#e5e5e5] shadow-xl transition-all duration-300 ${activeMenu === cat.name ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="w-full px-9 py-10 flex flex-col gap-8">
                      
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-[32px] font-extrabold text-[#2f2e2a]">
                          {cat.name}
                        </h2>
                        <button 
                          onClick={() => { setActiveMenu(null); navigate(`/${parentSlug}`); }}
                          className="rounded-full bg-[#69705b] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#525845] transition"
                        >
                          Shop all {cat.name.toLowerCase()}
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-4 w-full">
                        {cat.items?.map((item) => {
                          const itemSlug = item.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");

                          return (
                            <ProductCard
                              key={item.id}
                              title={item.title}
                              img={item.img}
                              discount={item.discount}
                              onClick={() => { 
                                setActiveMenu(null); // Forces the menu closed immediately!
                                navigate(`/${parentSlug}/${itemSlug}`); 
                              }}
                            />
                          );
                        })}
                      </div>
                      
                    </div>
                  </div>
                </div>
              );
            })}

            {/* BLUEY SECTION */}
            <div 
              className="group flex items-center h-[80px] -my-[30px] cursor-pointer"
              onMouseEnter={() => setActiveMenu('bluey')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center gap-1.5 hover:opacity-80 transition">
                <span className="text-[#5a6fa8] text-[28px] font-extrabold lowercase">
                  <img
                    src="https://au.koala.com/cdn/shop/files/Logo_3.svg?v=1760480610&width=146"
                    alt="Bluey Logo"
                    className="inline-block w-[65px] h-auto -mt-1"
                  />
                </span>
                <ChevronDown size={16} strokeWidth={2.5} className="group-hover:rotate-180 transition-transform duration-300 text-[#2f2e2a] mt-0.5" />
              </div>

              <div className={`absolute left-0 top-full w-full bg-[#f8f8f6] border-t border-[#e5e5e5] shadow-xl transition-all duration-300 ${activeMenu === 'bluey' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-full px-9 py-10 flex flex-col gap-8">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-[32px] font-extrabold text-[#2f2e2a]">Koala x Bluey</h2>
                    <button className="rounded-full bg-[#69705b] px-6 py-3 text-[15px] font-bold text-white hover:bg-[#525845] transition">
                      Shop Koala x Bluey
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-4 w-full">
                    <ProductCard 
                      title="Playtime Sofa Bed" 
                      img="cofee.webp" 
                      discount="20% off" 
                      onClick={() => { setActiveMenu(null); navigate('/bluey/playtime-sofa-bed'); }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="flex items-center gap-6 text-[#2f2e2a]">
            <button className="hover:scale-110 transition cursor-pointer">
              <Search size={22} strokeWidth={2} />
            </button>
            <button className="hover:scale-110 transition cursor-pointer">
              <UserCircle2 size={24} strokeWidth={2} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative hover:scale-110 transition cursor-pointer"
            >
              <ShoppingCart size={24} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#6e7464] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}