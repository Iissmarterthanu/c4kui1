// require("dotenv").config({path: "../../.env"});
// const stripeAPI = require("stripe")(process.env.SECRET_KEY);
const functions = require('firebase-functions');
const { Stripe } = require('stripe');
const stripeAPI = new Stripe(functions.config().stripe.skkey);


async function createCheckoutSession(req, res) {
  // const domainUrl = process.env.WEB_APP_URL;
  const domainUrl = "http://localhost:3000";

  const {lineItems, customerEmail} = req.body;
  // check req body has line items and email
  if (!lineItems || !customerEmail) {
    return res.status(400).json({error:
      "missing required session parameters"});
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card", "acss_debit"],
      mode: "payment",
      lineItems,
      customerEmail,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: {allowed_countries: ["CA", "GB", "US"]},
    });
    res.status(200).json({sessionId: session.id});
  } catch (error) {
    console.log(error);
    res.status(400).json({error:
      "an error occured, unable to create session"});
  }
}

module.exports = createCheckoutSession;
