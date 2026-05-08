import { Link } from "react-router-dom";
import { useState } from "react";

export default function LivingRoom() {
  const categories = [
    { name: "Shop All Room", slug: "all", image: "https://au.koala.com/cdn/shop/files/PaddingtonBoucle_QUEEN_1-44jfby0c2HadiWoKK7iOvl.jpg?v=1725432764&width=840" },
    { name: "Mattresses", slug: "mattresses", image: "https://au.koala.com/cdn/shop/files/Luxe_Mattress_Bundle_1-YpXB6HtWcMi4WE6bJLngt.jpg?v=1725431305&width=840" },
    { name: "Bed Bases", slug: "bed-bases", image: "https://au.koala.com/cdn/shop/files/KirribilliBedBase_Queen_6-6BLsSSNTfXHLiPoDZHyOQb.jpg?v=1725433212&width=840" },
    { name: "Bedroom Bundles", slug: "bedroom-bundles", image: "https://au.koala.com/cdn/shop/files/Balmain_BedAndBedsidesBundle_1.webp?v=1728705772&width=840" },
    { name: "Kids Bedroom", slug: "kids-bedroom", image: "https://au.koala.com/cdn/shop/files/Joey_KidsMattress_3-K2vMuRP2gTojdvx0HoZBe.jpg?v=1725433104&width=840" },
    { name: "Pillows", slug: "pillows", image: "https://au.koala.com/cdn/shop/files/KENKOA0044_Koala_09-12-2021_08_All_Pillows_AU_JP_0744_R1-Cropped-76JMCayN9usa8g6vOfXMM7.jpg?v=1725433187&width=840" },
    { name: "Bedside Table", slug: "bedside-table", image: "https://au.koala.com/cdn/shop/files/T0031_-AU_Bedside-TableN-AAU_Queen_Keen-As_1492_1703-6X7NkQay9RsOTs6jzy4XXp.jpg?v=1725435066&width=840" },
    { name: "Bedcover & Sheets", slug: "bedcover-sheets", image: "https://au.koala.com/cdn/shop/files/0.Crumple_Grey_Gum_Sheets-BgmvrhGpDgsUaKqok0DJb.jpg?v=1725433365&width=840" },
  ];

  const [sort, setSort] = useState("featured");

  const products = [
    {
      name: "Classic comfort",
      description: "Koala Mattress, Queen, 5 Sizes",
      price: "From $890",
      rating: 4.8,
      reviews: 2716,
      badge: "Classic comfort",
      image: "https://au.koala.com/cdn/shop/files/AU_-_The_New_Koala_Mattress_-_Queen_-_1_2.webp?v=1728135769&width=533",
    },
    {
      name: "Premium comfort",
      description: "Koala Plus Mattress, Queen, 6 Sizes",
      price: "From $1,050",
      rating: 4.8,
      reviews: 1254,
      badge: "Premium comfort",
      image: "https://au.koala.com/cdn/shop/files/PlusMattress_4_1.jpg?v=1728227347&width=533",
    },
    {
      name: "Luxe comfort",
      description: "Koala Luxe Mattress, King, 4 Sizes",
      price: "From $1,490",
      rating: 4.8,
      reviews: 800,
      badge: "Luxe comfort",
      image: "https://au.koala.com/cdn/shop/files/Queen_Luxe_Mattress_1_3.webp?v=1728130989&width=533",
    },
    {
        name: "Classic comfort",
        description: "Koala Mattress, Queen, 5 Sizes",
        price: "From $890",
        rating: 4.8,
        reviews: 2716,
        badge: "Classic comfort",
        image: "https://au.koala.com/cdn/shop/files/AU_-_The_New_Koala_Mattress_-_Queen_-_1_2.webp?v=1728135769&width=533",
      },
      {
        name: "Premium comfort",
        description: "Koala Plus Mattress, Queen, 6 Sizes",
        price: "From $1,050",
        rating: 4.8,
        reviews: 1254,
        badge: "Premium comfort",
        image: "https://au.koala.com/cdn/shop/files/PlusMattress_4_1.jpg?v=1728227347&width=533",
      },
      {
        name: "Luxe comfort",
        description: "Koala Luxe Mattress, King, 4 Sizes",
        price: "From $1,490",
        rating: 4.8,
        reviews: 800,
        badge: "Luxe comfort",
        image: "https://au.koala.com/cdn/shop/files/Queen_Luxe_Mattress_1_3.webp?v=1728130989&width=533",
      },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative">
        <img
          src="https://au.koala.com/cdn/shop/files/Desktop_Bedroom_d01d318c-8304-4032-8778-af5739bf0d63.png?v=1774868757&width=2000"
          alt="Living Room Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">BedRoom</h1>
          <p className="mt-4 text-lg md:text-xl">
          Create your perfect sleep sanctuary.
          </p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 px-6">
        {categories.map((category) => (
          <Link to={`/living-room/${category.slug}`} key={category.name}>
            <div className="rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Product Section (screenshot style) */}
      <div className="flex flex-col md:flex-row mt-16 px-6 gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 border-b md:border-r border-gray-200 pb-6 md:pb-0">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Size</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Single (10)</li>
              <li>Double (12)</li>
              <li>Queen (14)</li>
              <li>King (14)</li>
              <li>King Single (8)</li>
              <li>Super King (2)</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Colour</h3>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
              {["Beige","Blue","Bronze","Brown","Gold","Green","Grey","Orange","Pink","Purple","Red","White"].map(color => (
                <span key={color}>{color}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Mattresses</h1>
            <div>
              <label className="mr-2 text-gray-600">Sort by:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.name} className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-xs uppercase text-blue-600 font-bold">{product.badge}</span>
                  <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <div className="flex items-center mt-2 text-yellow-500">
                    ★ {product.rating} <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                  </div>
                  <p className="mt-2 font-bold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
