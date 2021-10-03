// firebase deploy --only functions
const functions = require('firebase-functions');
const YOUR_DOMAIN = 'http://localhost:3000/checkout';

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
	// functions.logger.log("data", data);
  // return `Hello ${data.customer_email}, c4k`;
	const stripe = require('stripe')(functions.config().stripe.skkey);
	const session = await stripe.checkout.sessions.create({
		customer_email: data.customer_email,
		mode: "payment",
		payment_method_types: ["card"],
		line_items: data.line_items,
		shipping_address_collection: {allowed_countries: ["CA", "GB", "US"]},
		success_url: `${YOUR_DOMAIN}/success`,
		cancel_url: `${YOUR_DOMAIN}/canceled`,
	});
	return {id: session.id, url: session.url};
});
