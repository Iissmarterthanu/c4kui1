// trying direct call

const functions = require("firebase-functions");
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello Collars for Kings!");
});

exports.callHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello ${name}, c4k`;
});

exports.checkout = functions.https.onRequest( (req, res) => {
  cors(req, res, async () => {
    // your function body here - use the provided req and res from cors
    const { Stripe } = require('stripe');
    const stripeAPI = new Stripe(functions.config().stripe.skkey);
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
  })
}) 