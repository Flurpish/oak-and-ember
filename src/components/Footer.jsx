import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-orange-600">Oak & Ember</h2>
          <p className="mt-2 text-sm">
            Handcrafted soy candles made with care in the USA.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
            <li><Link to="/shop" className="hover:text-orange-600">Shop</Link></li>
            <li><Link to="/about" className="hover:text-orange-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Stay in the Loop</h3>
          <p className="text-sm mb-3">Subscribe for candle tips and seasonal releases.</p>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-2 border rounded text-sm mb-2"
          />
          <button className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 text-sm">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs mt-10 text-gray-500">
        © 2025 Oak & Ember. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
