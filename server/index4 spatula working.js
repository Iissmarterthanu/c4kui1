const express = require("express")
const app = express()
// require("dotenv").config()
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const functions = require('firebase-functions');
const { Stripe } = require('stripe');
const stripe = new Stripe(functions.config().stripe.skkey);

// const bodyParser = require("body-parser")
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "CAD",
			description: "Collars forKings",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

// app.listen(process.env.PORT || 4000, () => {
// 	console.log("Sever is listening on port 4000")
// })

exports.checkout = functions.https.onRequest(app); 
