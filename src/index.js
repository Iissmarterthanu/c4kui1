import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from './App';
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

const history = createBrowserHistory();
// const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Router history = {history}>
      {/* <Elements stripe={stripePromise}> */}
        <App />
      {/* </Elements> */}
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
