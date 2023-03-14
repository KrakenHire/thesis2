const express = require('express')
const cors = require ('cors')
const {}=require ('../database/index')
const providerRoutes = require("./routes/provider")
const userRoutes=require('./routes/user')
const ratingRoutes=require('./routes/rating')
const reviewsRoutes=require('./routes/reviews')
// var models = require('../database/models');
const PORT = 3000
const app = express();
const Stripe = require("stripe");


const stripePublishableKey ="pk_test_51MjgQxKdIj3KzhLkitS6PqVSbORFpzKeybtcFPFZmljvV5qfwCD1HC0cCtXf4yHNLv26Jubz0HR65ReoojrWMo1900K9fpCVhE"
const stripeSecretKey = "sk_test_51MjgQxKdIj3KzhLkpz8jhC6D94LtRPb6J7hS4GzGW5HgiSC2ZTckzfrV5KOPAUQSgEVfeU35GMFrSmKsBul5kup800hVDseu2D"

const stripe = Stripe(stripeSecretKey, { apiVersion: "2022-11-15" }
);



app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, //lowest denomination of particular currency
      currency: 'usd',
     
      payment_method_types: ['card'], //by default

    });
    console.log(paymentIntent);
    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

//Don't forget to add Middlewares for parsing incoming requests
//with JSON and urlencoded payloads depending on your http client 

// app.use(express.static(__dirname + '/../client/dist'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/provider",providerRoutes )
app.use("/user",userRoutes )
app.use("/rating",ratingRoutes)
app.use("/reviews",reviewsRoutes)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
