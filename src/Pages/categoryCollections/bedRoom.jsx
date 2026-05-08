import { useState, useEffect } from "react"; // ✅ ADD THIS
import Banner from "../../components/Banner/index.jsx";
import CategoryGrid from "../../components/CategoryGrid.jsx/index.jsx";
import ProductGrid from "../../components/ProductGrid/index.jsx";
import axios from "axios";
import API_URL from "../../Api_path";

export default function LivingRoom() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/featuredCategories`)
      .then((res) => {
        const livingRoomData = res.data.find(
          (item) => item.navigate === "living-room"
        );
        setData(livingRoomData);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">

      <Banner {...data.banner} />

      <CategoryGrid categories={data.categories} />

      <ProductGrid products={data.products} />

    </div>
  );
}