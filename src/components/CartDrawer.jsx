import { useCart } from '../context/CartContext';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch('https://oak-and-embers.netlify.app/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error', err);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        {/* Drawer panel */}
        <div className="fixed inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-full sm:w-[400px] bg-white h-full shadow-xl flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-red-500 transition cursor-pointer"
                  aria-label="Close cart"
                >
                  <X />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item, i) => (
                      <li key={i} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p>Qty: {item.quantity}</p>
                          <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-sm text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer actions */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition cursor-pointer text-sm"
                  >
                    Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition cursor-pointer text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
