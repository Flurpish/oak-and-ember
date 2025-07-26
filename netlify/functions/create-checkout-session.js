// CommonJS style for Netlify Functions
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  let cartItems;
  try {
    ({ cartItems } = JSON.parse(event.body));
  } catch (parseErr) {
    console.error('Error parsing request body:', parseErr);
    return {
      statusCode: 400,
      body: 'Invalid JSON',
    };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),

      // 1) Collect shipping address (you can switch to billing_address_collection)
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // adjust as needed
      },

      // 2) Add a custom “Special notes” text field
      custom_fields: [
        {
          key: 'special_notes',
          label: { type: 'custom', custom: 'Special notes' },
          type: 'text',
          required: false,
        },
      ],

      success_url: 'https://oak-and-embers.netlify.app/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://oak-and-embers.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe checkout.sessions.create error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
