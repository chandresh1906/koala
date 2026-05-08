import { useNavigate } from "react-router-dom";

const getImageUrl = (imgString) => {
  if (!imgString) return '';

  if (imgString.startsWith('http')) return imgString;

  return new URL(`../../assets/${imgString}`, import.meta.url).href;
};

export default function CategoryGrid({ categories }) {

  const navigate = useNavigate();

  return (
    <div className="px-6 mt-6">

      {/* ✅ Horizontal scroll */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">

        {categories.map((category) => (
          
          <div 
            key={category.slug} 
            className="min-w-[200px] flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/category/${category.slug}`)}
          >
            <img  
              src={getImageUrl(category.image)}  
              alt={category.name} 
              className="w-full h-32 object-cover rounded-xl"
            />

            <p className="mt-2 text-center font-semibold">
              {category.name}
            </p>
          </div>

        ))}

      </div>

    </div>
  );
}