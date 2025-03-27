import React from 'react'
// import {loadStripe} from '@stripe/stripe-js'  

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const Checkout = () => {

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const session = await response.json();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again later.');
    }
  };

  return (
    <div className='checkout'>
      <h1>Hey, Nice to see you!</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default Checkout