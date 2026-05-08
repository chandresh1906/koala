export default function FilterSidebar({ setFilter }) {
    return (
      <div className="p-4">
        <h2 className="font-bold mb-4">Filters</h2>
  
        {/* COLOR */}
        <p className="font-semibold">Color</p>
        <div className="flex gap-2 mt-2">
          <button onClick={() => setFilter("beige")}>Beige</button>
          <button onClick={() => setFilter("brown")}>Brown</button>
          <button onClick={() => setFilter("black")}>Black</button>
        </div>
  
        {/* PRICE */}
        <p className="font-semibold mt-4">Price</p>
        <button onClick={() => setFilter("low")}>
          Below 2000
        </button>
      </div>
    );
  }