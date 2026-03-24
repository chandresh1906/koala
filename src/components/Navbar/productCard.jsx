function ProductCard({ title, img, discount }) {
    console.log(img);
  return (
    <div className="flex flex-col items-center gap-3 cursor-pointer group/card">
      <div className="w-full bg-white border border-[#e5e5e5] rounded-[10px] flex flex-col items-center p-4">
        {discount && (
          <div className="self-start mb-2 bg-[#cbf2d6] text-[#2f2e2a] text-[11px] font-bold px-2 py-1 rounded-full">
            {discount}
          </div>
        )}
        <img
          src={`src/assets/${img}`}
          alt={title}
          className="w-full h-40 object-contain group-hover/card:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="text-[14px] font-medium text-[#2f2e2a]">{title}</span>
    </div>
  );
}
export default ProductCard;
