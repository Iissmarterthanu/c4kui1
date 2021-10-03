import { Button, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './checkoutStyles';
import StripePayment from './StripePayment';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';


const Checkout = ({ cartItems, user }) => {
  const classes = useStyles();
  console.log("StripeCheckout");
  console.log(user);

  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(user);
  const stripe = useStripe();
  const elements = useElements();

  const itemsPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0); 
  const taxPrice = itemsPrice * 0;
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)
  const shippingPrice = qtyTotal * 12 * 0.9 ** qtyTotal;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const lineItems = cartItems.map(item => {
    return {
      quantity: item.qty,
      price_data: {
        currency: 'cad',
        unit_amount: Number(item.price) * 100, // amount is in cents
        product_data: {
          name: item.id +" - "+ item.size,
          description: item.name,
          images: [], 
        }
      }
    }
  });


  const handleCheckout = async (e) => {
    
    try {
      const response = await axios.post(
        "https://us-central1-crown-db-1f1b5.cloudfunctions.net/checkout/create-checkout-session", 
        {
          customer_email: email,
          line_items: lineItems,
        }
      )

      console.log("response", response);

      if(response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
      }

    } catch (error) {
      console.log("Error", error)
    }
  };

  return (
    <div className="checkout">
      <Container>
        <Typography variant="h4" align="center">Checkout Summary</Typography>
        <Typography variant="h5" align="center">Total Items: {qtyTotal}</Typography>
        <Typography variant="h5" align="center">Amount to Pay: ${totalPrice}</Typography>
        <Button onClick={handleCheckout}>Continue</Button>
      </Container>      
    </div>
  );
}

export default Checkout;