import React, { useContext, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

// import { fetchFromAPI } from '../../../helpers';
import { Button, Typography } from '@material-ui/core';
import { getFunctions, httpsCallable } from "firebase/functions";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#333b3d",
			color: "#463838",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#585647" },
			"::placeholder": { color: "#9fa3a8" }
		},
		invalid: {
			iconColor: "#d32970",
			color: "#d41041"
		}
	}
}

const StripePayment = ({ cartItems, user }) => {
  console.log("StripeCheckout");
  console.log(user);

  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(user);
  const stripe = useStripe();
  const elements = useElements();

  const itemsPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0); 
  const taxPrice = itemsPrice * 0;
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)
  const shippingPrice = qtyTotal * 15 * 0.9 ** qtyTotal;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const handleSubmit = async (e) => {
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
            amount: totalPrice * 100,
            id
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

return (
    <>
    {!success ? 
    <form onSubmit={handleSubmit}>
      <input 
        type='email'
        onChange={e => setEmail(e.target.value)}
        placeholder='Email'
        value={email}
        className='nomad-input'
      />

      <fieldset className="FormGroup">
          <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
          </div>
      </fieldset>
      <button>Pay</button>
    </form>
    :
   <div>
       <Typography varient="h3">Payment successful</Typography>
   </div> 
    }
        
    </>
)
}

export default StripePayment;