import React from 'react'
import {loadStripe} from '@stripe/stripe-js'  

const stripePromise = loadStripe('pk_test_51R7NAHRZ8fk0kmGaRoeYrHGZhH4whhjyEiUcmDbbbUWjoF01rn47MvxgL2eGZ5CBLMqTZVnDSPVqcgwsWxnR0Oze00ACvxYbov')

const Checkout = () => {

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });      
      
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: (await response.json()).id,
      });
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