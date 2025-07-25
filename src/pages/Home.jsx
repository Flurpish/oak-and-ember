import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import client from "../sanity/client";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await client.fetch(`
          *[_type == "product"]{
            name,
            description,
            price,
            "imageUrl": image.asset->url,
            filters[]->{
              title,
              category->{ title }
            }
          }
        `);
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setFeaturedProducts(selected);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="w-full h-[60vh] bg-gray-200 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-orange-600">[Banner Image Placeholder]</h1>
      </section>

      {/* Mission Statement */}
      <section className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Handcrafted warmth in every pour</h2>
        <p className="max-w-xl mx-auto">
          Discover the beauty of handmade soy candles crafted with care to bring comfort to your space.
        </p>
      </section>

      {/* Featured Products */}
      <section className="p-8">
        <h3 className="text-xl font-bold mb-4 text-center">Featured Candles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
