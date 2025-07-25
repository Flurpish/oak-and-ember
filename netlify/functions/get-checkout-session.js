const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const sessionId = event.queryStringParameters && event.queryStringParameters.sessionId;
  if (!sessionId) {
    return {
      statusCode: 400,
      body: 'Missing sessionId',
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (err) {
    console.error('Stripe checkout.sessions.retrieve error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
