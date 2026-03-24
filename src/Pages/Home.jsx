import TopOfferBar from "../components/Topoffer/TopOfferBar";
import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner"; // 1. Check this import!

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopOfferBar />
      <Navbar />
      
      {/* 2. Check if this line is here and NOT commented out */}
      <HeroBanner /> 

      {/* <div className="p-10">
        <p>If you can see this text but not the hero, the hero is broken.</p>
        <p>If you CAN'T see this text, Home.jsx isn't updating at all.</p>
      </div> */}
    </div>
  );
}