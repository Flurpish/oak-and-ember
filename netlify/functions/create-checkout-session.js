// netlify/functions/create-checkout-session.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    console.error('Invalid JSON:', err);
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { cartItems, shippingAddress, specialNotes } = payload;

  // Basic validation
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { statusCode: 400, body: 'cartItems required' };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      // Keep shipping collection if you like:
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },

      // Instead of custom_fields, shove notes & address into metadata:
      metadata: {
        special_notes: specialNotes || '',
        address_line1: shippingAddress?.address_line1 || '',
        address_city: shippingAddress?.city || '',
        address_state: shippingAddress?.state || '',
        address_postal_code: shippingAddress?.postal_code || '',
        address_country: shippingAddress?.country || '',
      },

      success_url:
        'https://oak-and-embers.netlify.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://oak-and-embers.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe Error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
