import { Link } from "react-router-dom";

export default function CategoryGrid({ data, getImageUrl }) {
    return (
      <section className="mx-auto max-w-[1550px] px-9 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Furniture loved by millions
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item.id}>
  <Link 
            key={item.id} 
            to={`/collections/${item.navigate}`} 
            className="block"
          >
            <img
              src={getImageUrl(item.img)}
              alt={item.title}
              className="rounded-xl"
            />
            <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
          </Link>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
    );
  }