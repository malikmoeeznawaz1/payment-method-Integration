import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get('/', (req, res) => {
  res.send('Hello World!');
});   

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: 'price_1R7NWURZ8fk0kmGaE4ewIU8S',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/cancel`,
  });
});

app.get('/success', (req, res) => {
  res.send('Payment Successful!');
});

app.get('/cancel', (req, res) => {
  res.send('Payment Cancelled!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});