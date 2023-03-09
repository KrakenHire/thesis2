const express = require('express')
const cors = require ('cors')
const {}=require ('../database/index')
const providerRoutes = require("./routes/provider")
const userRoutes=require('./routes/user')
const Stripe = require("stripe");
const bodyParser = require("body-parser");
// var models = require('../database/models');
const PORT = 3000
const app = express()

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || "";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get("/", (req, res) => {
  res.send({ "Welcome to": "Expo's Stripe example server!" });
});

app.get("/stripe-key", (req, res) => {
  res.send({ publishableKey: stripePublishableKey });
});

app.post("/create-payment-intent", async (req, res) => {
  const {
    email,
    items,
    currency,
    request_three_d_secure,
    payment_method_types = [],
  } = req.body;

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2020-08-27",
  });

  const customer = await stripe.customers.create({ email });

  // Create a PaymentIntent with the order amount and currency.
  const params = {
    amount: 1400,
    currency,
    customer: customer.id,
    payment_method_options: {
      card: {
        request_three_d_secure: request_three_d_secure || "automatic",
      },
      sofort: {
        preferred_language: "en",
      },
    },
    payment_method_types: payment_method_types,
  };
  console.log('!@# 1')
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    console.log('!@# create pi', paymentIntent)
    // Send publishable key and PaymentIntent client_secret to client.
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('!@# create error', error);
    res.send({
      error: error.raw.message,
    });
  }
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks
app.post(
  "/webhook",
  // Use body-parser to retrieve the raw body as a buffer.
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2020-08-27",
    });

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"] || [],
        stripeWebhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      res.sendStatus(400);
      return;
    }
    const data = event.data;
    const eventType = event.type;

    if (eventType === "payment_intent.succeeded") {
      const pi = data.object;

      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
      console.log("💰 Payment captured!");
    }
    if (eventType === "payment_intent.payment_failed") {
      const pi = data.object;
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
      console.log("❌ Payment failed.");
    }

    res.sendStatus(200);
  }
);



//Don't forget to add Middlewares for parsing incoming requests
//with JSON and urlencoded payloads depending on your http client 

// app.use(express.static(__dirname + '/../client/dist'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/provider",providerRoutes )
app.use("/user",userRoutes )


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
