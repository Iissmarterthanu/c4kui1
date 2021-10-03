import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './checkoutStyles';
import StripePayment from './stripeCheckout/StripePayment';
// import { getFunctions, httpsCallable } from "firebase/functions";

const Checkout = ({ cartItems, user }) => {
  const classes = useStyles();

  const itemsPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0); 
  const taxPrice = itemsPrice * 0;
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)
  const shippingPrice = qtyTotal * 15 * 0.9 ** qtyTotal;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // const functions = getFunctions();
  // const callHello = httpsCallable(functions, 'callHello');
  // const handleTest = (e) => {
  //   console.log("test");
  //   callHello({name: 'Fernando'}).then(result=>{
  //     console.log(result.data);
  //   }).catch((error) => {
  //     console.log(`error: ${JSON.stringify(error)}`);
  //   });     
  // };

  return (
    <div className="checkout">
      <Container>
        <Typography variant="h4" align="center">Checkout Summary</Typography>
        <Typography variant="h5" align="center">Total Items: {qtyTotal}</Typography>
        <Typography variant="h5" align="center">Amount to Pay: ${totalPrice}</Typography>
        {/* <Button onClick={handleTest}>test</Button> */}
        <StripePayment cartItems={cartItems} user={user} />
        {/* <StripeCheckout cartItems={cartItems} user={user} /> */}
      </Container>      
    </div>
  );
}

export default Checkout;