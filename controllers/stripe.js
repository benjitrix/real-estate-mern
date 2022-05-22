const asyncWrapper = require("../middleware/async");
const Estate = require('../models/Estate')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// stripeAPI
const stripeAPI = asyncWrapper(async (req, res, next) => {
  console.log('stripeAPI');

  const calculateOrderAmount =  async (callback) => {
      let sum = 0
      for (const item of req.body) {
        const { id } = item
        await Estate.findById({_id: id})
          .then(estate => {
            sum += Number(estate.price)
            console.log(sum);
          }) 
      }
      console.log('total: ', sum);
      callback(sum)
  };

  // Create a PaymentIntent with the order amount and currency
  const getPaymentIntent = async (sum) => {
    console.log('total in intent: ', sum);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: sum,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
      console.log(paymentIntent);

      res.json({ 
        clientSecret: paymentIntent.client_secret 
      });
  }
  
  calculateOrderAmount(getPaymentIntent)
})

module.exports = stripeAPI