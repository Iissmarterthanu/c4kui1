// firebase deploy --only functions

const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.skkey);
const express = require("express")
const app = express()
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

const cors = require("cors");
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/create-checkout-session', async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const {line_items, customer_email} = req.body;
	// functions.logger.log("req.body", req.body);
	
	// return res.status(304).send(customer_email);
	// return res.send(customer_email);
	
	if (!line_items || !customer_email) {
		functions.logger.log("error", customer_email, line_items);
    return res.status(400).json({error:
      "missing required session parameters"});
		}
		
	// functions.logger.log("good to try", customer_email);
	
	try {
		const session = await stripe.checkout.sessions.create({
			customer_email: customer_email,
			mode: "payment",
			payment_method_types: ["card"],
			line_items: line_items,
			shipping_address_collection: {allowed_countries: ["CA", "GB", "US"]},
			success_url: `${YOUR_DOMAIN}/?success=true`,
			cancel_url: `${YOUR_DOMAIN}/?canceled=true`,
		});
		functions.logger.log("session.url 1", session.url);
		return res.status(200).json({ "session.url": session.url, });
		// return res.redirect(303, session.url).send()
		// return res.status(303).redirect(session.url)
	} catch (e) {
		functions.logger.log("catch", e.message);
		return res.status(400).send({error: e.message});
	}

});

exports.checkout = functions.https.onRequest(app); 
