import { Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './checkoutStyles';
import StripePayment from '../stripeExtra/StripePayment';
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

  const line_items = cartItems.map(item => {
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


  const handleCheckout = (e) => {
    e.preventDefault()
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    })

    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post(
              "https://us-central1-crown-db-1f1b5.cloudfunctions.net/checkout/payment", 
              {
                id,
                customer_email: email,
                line_items,
            })
    
            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }
    
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
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