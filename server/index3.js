// firebase functions w/ HTTPS

const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const createCheckoutSession = require("./checkout1");

const app = express();
// const port = 8080;

app.use(express.json());
app.use(cors({origin: true}));

app.get("/", (req, res) => res.send("Hello world!"));
app.get("/c2/", (req, res) => res.status(400).send({error:
  "an error occured"}));
app.get("/c3/", (req, res) => res.status(400).json({error:
  "an error occured"}));

// app.post("/spatula", spatulafn);

app.post("/create-checkout-session", createCheckoutSession);

// app.listen(port, () => console.log("Sever is listening on port", port));

exports.checkout = functions.https.onRequest(app); 
