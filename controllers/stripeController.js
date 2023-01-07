import asyncWrapper from "../middleware/asyncWrapper.js";
import stripe from "stripe";

const stripeController = asyncWrapper(async (req, res) => {
  const stripeClient = stripe(process.env.STRIPE_API_KEY);
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  console.log(paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
});

export default stripeController;
