import { useRef, useState } from "react";

export default function VideoBanner({ data }) {
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getImageUrl = (fileName) =>
    new URL(`../../assets/${fileName}`, import.meta.url).href;

  return (
    <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
      <video
        ref={videoRef}
        src={getImageUrl(data.videoUrl)}
        poster={getImageUrl(data.posterUrl)}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-[1400px] mx-auto">
        <h2 className="text-white text-[40px] font-bold">{data.title}</h2>
        <p className="text-white mt-2">{data.subtitle}</p>
        <button className="bg-white mt-4 px-6 py-2 rounded-full w-60">
          {data.buttonText}
        </button>
      </div>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-6 right-6 text-white"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </section>
  );
}