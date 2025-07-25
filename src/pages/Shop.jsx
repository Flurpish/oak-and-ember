import { useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import client from "../sanity/client"; 

function Shop() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  // Fetch products + filters from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await client.fetch(`*[_type == "product"]{
        name,
        description,
        price,
        "imageUrl": image.asset->url,
        filters[]->{ title, category->{ title } }
      }`);

      const filtersData = await client.fetch(`*[_type == "filterCategory"]{
        title,
        "filters": *[_type == "filter" && references(^._id)]{ title }
      }`);

      setProducts(productsData);
      setFilterCategories(filtersData);
    };

    fetchData();
  }, []);

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(search.toLowerCase());

    const productFilterTitles = (product.filters || []).map(f => f.title);
    const matchesFilters =
      activeFilters.length === 0 ||
      activeFilters.every((f) => productFilterTitles.includes(f));

    return matchesSearch && matchesFilters;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Shop Candles</h2>

      {/* Search + Filter */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search candles..."
            className="w-full border rounded p-2 pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-1 border rounded px-3 py-2 hover:bg-gray-100 transition"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Filter Dropdown */}
      {filterOpen && (
        <div className="border rounded p-4 mb-6 shadow">
          {filterCategories.map((category, i) => (
            <div key={i} className="mb-4">
              <h4 className="font-semibold mb-2">{category.title}</h4>
              <div className="flex flex-wrap gap-2">
                {category.filters.map((filter, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleFilter(filter.title)}
                    className={`px-3 py-1 rounded border ${
                      activeFilters.includes(filter.title)
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {filter.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeFilters.length > 0 && (
        <button
          onClick={() => setActiveFilters([])}
          className="mb-6 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-sm"
        >
          Clear Filters
        </button>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
