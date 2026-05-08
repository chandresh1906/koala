import livingRoomImg from '../../assets/furniture/livingroom.jpg';
import bedroomImg from '../../assets/furniture/bedroom.jpg';
import outdoorImg from '../../assets/furniture/outdoor.jpg';
import blueyImg from '../../assets/furniture/bluey.jpg';

export default function Furniture() {


  const categories = [
    { 
      title: "Living Room", 
      discount: "Up to 30% off", 
      imgSrc: livingRoomImg 
    },
    { 
      title: "Bedroom",   
      discount: "Up to 30% off", 
      imgSrc: bedroomImg 
    },
    { 
      title: "Outdoor", 
      discount: "12% off", 
      imgSrc: outdoorImg 
    },
    { 
      title: "Koala x Bluey", 
      discount: "Up to 20% off", 
      imgSrc: blueyImg  
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-16 bg-[#F5F5F3]">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">
        Furniture loved by millions of homes around the world
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
          </div>
        ))}
      </div>
    </div>
  );
}