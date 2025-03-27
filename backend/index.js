import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({origin: "http://localhost:5173",credentials: true})
);
const PORT = process.env.PORT || 3000;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get('/', (req, res) => {
  res.send('Hello World!');
});   

app.post('/checkout', async (req, res) => {
  try {
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

    return res.json(session);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
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