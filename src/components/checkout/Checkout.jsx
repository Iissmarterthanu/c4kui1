import { Button, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './checkoutStyles';
import StripePayment from '../stripeExtra/StripePayment';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getFunctions, httpsCallable } from "firebase/functions";
import Stripe from 'stripe';
// import axios from 'axios';


const Checkout = ({ cartItems, user, cartSummary}) => {
  const classes = useStyles();
  console.log("Checkout");
  console.log("user:", user);
  console.log("shipping:", cartSummary);
  
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(user);
  
  const lineItems = cartItems.map(item => {
    return {
      quantity: item.qty,
      price_data: {
        currency: 'cad',
        unit_amount: Number(item.price) * 100, // amount is in cents
        product_data: {
          name: item.id,
          description: item.name,
          images: [item.image], 
        }
      }
    }
  });
  
  lineItems.push({
    quantity: 1,
    price_data: {
      currency: 'cad',
      unit_amount: (cartSummary.current.shippingPrice * 100).toFixed(0), // amount is in cents
      product_data: {
        name: "Shipping",
        description: "by post",
        images: [], 
      }
    }
  });

    
  console.log("lineItems:", lineItems);

  
  
  const handleCheckout = (e) => {
    const functions = getFunctions();
    const createStripeCheckout = httpsCallable(functions, 'createStripeCheckout');
    const stripe = Stripe('pk_test_PZIvBeA5yTqiUOOiBBHA96AM00G7Pg3YgS');
    e.preventDefault();
    console.log("handleCheckout");
    createStripeCheckout(
      {
        customer_email: email,
        line_items: lineItems,
      }
    ).then(response=>{
      const sessionId = response.data.id; 
      console.log("check1",response.data);
      window.location = response.data.url;
      // stripe.redirectToCheckout({ sessionId: sessionId });
    }).catch((error) => {
      console.log(`error: ${JSON.stringify(error)}`);
    });     
  };

  return (
    <div className="checkout">
      <Container align="center">
        <Typography variant="h4" align="center">Checkout Summary</Typography>
        <Typography variant="h5" align="center">Total Items: {cartSummary.current.qtyTotal}</Typography>
        <Typography variant="h5" align="center">Amount to Pay: ${cartSummary.current.totalPrice}</Typography>
        <Button variant="contained" color="secondary" onClick={handleCheckout}>Continue</Button>
      </Container>      
    </div>
  );
}

export default Checkout;