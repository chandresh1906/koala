import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

// Create a mapping of currencies to their flags and names
const COUNTRY_INFO = {
  AUD: { flag: "https://flagcdn.com/w40/au.png", name: "Australia" },
  USD: { flag: "https://flagcdn.com/w40/us.png", name: "United States" },
  JPY: { flag: "https://flagcdn.com/w40/jp.png", name: "Japan" }
};

export default function TopOfferBar() {
  const targetDate = new Date("2026-04-10T23:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [aboutOpen, setAboutOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  
  // Grab BOTH currency and setCurrency from our context
  const { currency, setCurrency } = useCurrency();

  function getTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
    setCountryOpen(false); 
  };

  return (
    <div className="w-full bg-[#c8e8c9] text-[#4c4b3f] text-sm relative z-50">
      <div className="relative flex h-[3.25rem] items-center px-4 sm:px-9 justify-between">
        
        {/* Left: About Dropdown */}
        <div 
          className="flex items-center h-full relative"
          onMouseEnter={() => setAboutOpen(true)}
          onMouseLeave={() => setAboutOpen(false)}
        >
          <button className="flex items-center gap-1 font-medium cursor-pointer h-full">
            <span>About</span>
            {aboutOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {aboutOpen && (
            <div className="absolute left-0 top-full w-[200px] rounded-xl border border-[#e7e7e2] bg-white shadow-lg overflow-hidden">
              <ul className="py-2 text-sm text-[#2f2e2a]">
                <li className="px-5 py-2 hover:bg-[#f7f7f3] cursor-pointer">About Us</li>
                <li className="px-5 py-2 hover:bg-[#f7f7f3] cursor-pointer">Koala Second Home</li>
                <li className="px-5 py-2 hover:bg-[#f7f7f3] cursor-pointer">Koala Showroom</li>
              </ul>
            </div>
          )}
        </div>


        {/* Center Countdown */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 font-medium whitespace-nowrap">
          <span className="">Up to 30% off + EXTRA $100 off ends</span>

          <div className="hidden sm:flex items-center gap-1.5">

            <TimeBox value={timeLeft.days} label="D" />
            <TimeBox value={timeLeft.hours} label="H" />
            <TimeBox value={timeLeft.minutes} label="M" />
            <TimeBox value={timeLeft.seconds} label="S" />
          </div>
        </div>


        {/* Right Side Links & Country Dropdown */}
        <div className="absolute right-9 top-0 h-full flex items-center gap-8 font-medium hidden sm:flex ">

          <a href="#" className="hover:text-black transition">FAQs</a>
          <a href="#" className="hover:text-black transition">Trade</a>
          <a href="#" className="hover:text-black transition">Manage my orders</a>

          <div 
            className="relative flex items-center h-full"
            onMouseEnter={() => setCountryOpen(true)}
            onMouseLeave={() => setCountryOpen(false)}
          >
            <button className="flex items-center gap-2 cursor-pointer h-full">
              <img
                src="https://flagcdn.com/w40/au.png"
                alt="Australia"
                className="h-4 w-6 object-cover rounded"
              />
              {countryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {countryOpen && (
              <div className="absolute right-0 top-full w-[250px] rounded-xl border border-[#e7e7e2] bg-white shadow-lg overflow-hidden">
                <CountryItem flag="https://flagcdn.com/w40/au.png" country="Australia" currency="AUD $" />
                <CountryItem flag="https://flagcdn.com/w40/us.png" country="United States" currency="USD $" />
                <CountryItem flag="https://flagcdn.com/w40/jp.png" country="Japan" currency="JPY 円" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Child components */
function TimeBox({ value, label }) {
  return (
    <div className="flex items-center gap-0.5">
      <div className="rounded-sm bg-white px-2.5 py-1 leading-none font-semibold text-[#1f1f1b]">
        <AnimatedDigit value={value} />
      </div>
      <span className="text-xs md:text-sm font-semibold text-[#1f1f1b]">{label}</span>
    </div>
  );
}

function AnimatedDigit({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimate(true);
      const t1 = setTimeout(() => setDisplayValue(value), 100);
      const t2 = setTimeout(() => setAnimate(false), 200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [value, displayValue]);

  return (
    <span
      className="inline-block min-w-[1.5rem] text-center"
      style={{
        transform: animate ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
    >
      {displayValue}
    </span>
  );
}

function CountryItem({ flag, country, currency, onClick }) {
  return (
    <div className="flex cursor-pointer items-center justify-between border-b border-[#f1f1eb] px-5 py-3 hover:bg-[#f7f7f3] last:border-b-0">
      <div className="flex items-center gap-3">
        <img src={flag} alt={country} className="h-4 w-6 rounded object-cover" />
        <span className="text-sm text-[#2e2e2a]">{country}</span>
      </div>
      <span className="text-sm text-[#2e2e2a]">{currency}</span>
    </div>
  );
}
