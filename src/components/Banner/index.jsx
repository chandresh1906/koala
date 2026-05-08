// src/components/Banner.jsx
export default function Banner({ title, subtitle, image }) {
    console.log("🚀 ~ Banner ~ title:", title)
    return (
      <div className="relative">
        <img src={image} alt={title} className="w-full h-85 " />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="mt-4 text-lg md:text-xl">{subtitle}</p>
        </div>
      </div>
    );
  }
  