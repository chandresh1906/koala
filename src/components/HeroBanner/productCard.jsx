import { useNavigate } from "react-router-dom";

function ProductCard({ title, img, discount, category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/category/${category}`)}   // 🔥 IMPORTANT LINE
      className="flex flex-col items-center gap-3 cursor-pointer group/card"
    >
      <div className="w-full bg-white border border-[#e5e5e5] rounded-[10px] flex flex-col items-center p-4 transition-all duration-500 group-hover/card:shadow-xl group-hover/card:-translate-y-2">
        
        {discount && (
          <div className="self-start mb-2 bg-[#cbf2d6] text-[#2f2e2a] text-[11px] font-bold px-2 py-1 rounded-full">
            {discount}
          </div>
        )}

        <img
          src={`src/assets/${img}`}
          alt={title}
          className="w-full h-40 object-contain transition-transform duration-500 group-hover/card:scale-110"
        />
      </div>

      <span className="text-[14px] font-medium text-[#2f2e2a]">
        {title}
      </span>
    </div>
  );
}

export default ProductCard;