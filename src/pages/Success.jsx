import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Success() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) return;

      const res = await fetch(`/.netlify/functions/get-checkout-session?sessionId=${sessionId}`);
      const data = await res.json();
      setOrder(data);
    };

    fetchOrder();
  }, []);

  if (!order) return <p>Loading your order...</p>;

  return (
    <div className="p-8 text-center">
      <h1 className="pt-8 text-3xl font-bold mb-4">Thank you for your purchase!</h1>
      <p>Your order number:<span className="font-semibold"> {order.id} </span></p>
      <ul className="mt-4 space-y-2">
        {order.line_items.data.map(item => (
          <li key={item.id}>
            {item.quantity} × {item.description} — ${item.amount_total / 100}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold text-2xl">Total: ${order.amount_total / 100}</p>

        
    </div>

    
  );
}

export default Success;
