export default function FeaturesGrid({ data, getImageUrl }) {
    return (
      <section className="max-w-[1550px] mx-auto px-9 py-16">
        <h2 className="text-3xl font-bold mb-8">Features</h2>
  
        <div className="grid md:grid-cols-4 gap-6">
          {data.map((item) => (
            <div key={item.id}>
              <img src={getImageUrl(item.img)} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }