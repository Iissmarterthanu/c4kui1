import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_PZIvBeA5yTqiUOOiBBHA96AM00G7Pg3YgS";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer(props) {
	console.log("stripe container;", props);
	
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm  cartItems={props.cartItems}/>
		</Elements>
	)
};

export default StripeContainer;