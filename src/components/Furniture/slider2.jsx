import changesheetImg from "../../assets/change-sheet.jpg";
import comfortableImg from "../../assets/comfortable.jpg";
import fitingImg from "../../assets/fiting-free.jpg";
import patsImg from "../../assets/pats-free.jpg";

export default function Slider2() {
  const categories = [
    {
      title: "Washable, replaceable covers",
      discount: "Up to 30% off",
      imgSrc: changesheetImg,
      text: "Keep it clean and change up your style."
    },
    {
      title: "Trial products for 120 days",
      discount: "Up to 30% off",
      imgSrc: comfortableImg,
      text: "If it’s not right, send it back."
    },
    {
      title: "Simple tool-free assembly",
      discount: "12% off",
      imgSrc: fitingImg,
      text: "Slide-and-click for easy setup & moving."
    },
    {
      title: "Kid & pet friendly",
      discount: "Up to 20% off",
      imgSrc: patsImg,
      text: "With spill and scratch resistant fabrics."
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-16 bg-[#F5F5F3]">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
        Forward-thinking designs, rewriting the rules for modern homes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {categories.map((item, index) => (
          <div key={index} className="group cursor-pointer">

            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-200 shadow-sm">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <span className="absolute top-4 left-4 bg-[#D1EBD9] text-[#242424] text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                {item.discount}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900 group-hover:text-gray-700">
              {item.title}
            </h3>
            <h6 className="text-gray-600">{item.text}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}        