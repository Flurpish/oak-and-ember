import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-10">
      <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
      <p className="mt-4">No worries! You haven't been charged at all!</p>

      <Link to="/shop">
        <button className="p-3 flex gap-1 justify-center rounded border border-gray-300 px-3 py-2 hover:bg-gray-100 transition mt-6">
          Return to Shop
        </button>
      </Link>
    </div>
  );
}
