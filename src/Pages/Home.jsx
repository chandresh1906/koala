import TopOfferBar from "../components/Topoffer/TopOfferBar";
import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <TopOfferBar />
      
      <Navbar />

      <HeroBanner />

      <Footer />
    </div>
  );
}
