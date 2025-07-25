import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

const Header = () => {
  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ping, setPing] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setPing(true);
      const timer = setTimeout(() => setPing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <h1 className="text-xl font-dance text-orange-600">
            Oak & Ember
          </h1>
        </div>

        {/* Center: Navigation (desktop only) */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-orange-600 transition">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-orange-600 transition">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-600 transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition">Contact</Link>
        </nav>

        {/* Right: Cart + Hamburger */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer hover:text-orange-600 transition"
            aria-label="Open cart"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center transition">
                {ping && (
                  <span className="absolute inline-flex h-5 w-5 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                )}
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Hamburger for mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-orange-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="block text-gray-700 hover:text-orange-600 transition" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="block text-gray-700 hover:text-orange-600 transition" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-orange-600 transition" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
