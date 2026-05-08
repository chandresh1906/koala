import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../Api_path";
import CartModal from "../components/cartModal";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, fetchCart } = useCart(); // ✅ FIX 2: pull fetchCart too

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ FIX 3: Sync cart from server whenever this page loads
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/featuredCategories`);

        const living = res.data.find(
          item => item.navigate === "living-room"
        );

        const foundProduct = living?.products.find(
          p => p.id === Number(id)
        );

        setProduct(foundProduct);

        if (foundProduct?.colors?.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-20">Product not found</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 p-10">

      {/* IMAGE */}
      <div className="bg-gray-100 rounded-xl p-10">
        <img
          src={selectedColor?.image}
          alt={product.title}
          className="w-full object-contain"
        />
      </div>

      {/* DETAILS */}
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-[#2f2e2a]">
          {product.title}
        </h2>

        <p className="text-lg text-black flex items-center gap-3">
          {product.rate}
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaRegStarHalfStroke className="text-yellow-500" />
        </p>

        <p className="text-gray-500 text-sm">
          Premium Furniture • 3 Sizes
        </p>

        <p className="font-bold text-lg text-[#2f2e2a]">
          ₹{product.price}
        </p>

        {/* SIZE */}
        <div className="mt-6">
          <p className="font-semibold mb-2">Size</p>
          <div className="flex gap-3">
            <button type="button" className="border px-4 py-2 rounded-lg">3-Seater</button>
            <button type="button" className="border px-4 py-2 rounded-lg">2.5-Seater</button>
            <button type="button" className="border px-4 py-2 rounded-lg">1-Seater</button>
          </div>
        </div>

        {/* COLORS */}
        <div className="flex gap-2 mt-4">
          {product.colors?.map((color) => (
            <span
              key={color.name}
              className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selectedColor?.name === color.name
                ? "border-black"
                : "border-gray-300"
                }`}
              style={{ backgroundColor: color.name }}
              onClick={() => setSelectedColor(color)}
            ></span>
          ))}
        </div>

        {/* BUTTON */}
        <button
          type="button"
          className="mt-8 w-full bg-green-700 text-white py-3 rounded-xl text-lg"
          onClick={(e) => {
            e.preventDefault();
            addToCart({ ...product, selectedColor });
            setShowCart(true);
          }}
        >
          Add to Cart - ₹{product.price}
        </button>
      </div>

      {/* MODAL */}
      {showCart && (
        <CartModal
          product={{ ...product, selectedColor }}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
}