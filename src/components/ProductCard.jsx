import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ name, description, price, imageUrl, filters = [] }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ name, price, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md hover:scale-101 transition flex flex-col">
      {/* Image */}
      <div className="relative h-40 w-full mb-2 overflow-hidden rounded">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <span className="text-sm text-gray-500">[Image Placeholder]</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <h4 className="font-semibold text-lg mb-1">{name}</h4>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-2 font-bold">${price.toFixed(2)}</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-1 mt-2">
        {filters.map((filter, i) => (
          <span key={i} className="bg-gray-200 text-xs px-2 py-1 rounded">
            {filter.title}
          </span>
        ))}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className={`ease-in mt-2 px-4 py-2 rounded transition text-sm cursor-pointer ${
          added
            ? 'bg-green-600 text-white scale-105'
            : 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105'
        }`}
      >
        {added ? '✔️ Added!' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
