import { useEffect, useRef, useState } from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router";

import { getFromFS } from "./hooks/useFirebase";
import { getUser } from "./hooks/useAuth";

import Navbar from "./components/navbar/Navbar";
// import Test from "./views/Test";
import Home from "./views/Home";
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import Footer from "./components/footer/Footer";

import theme from './theme'
import useStyles from './appStyles';

import LogIn from "./components/signing/LogIn";
import SignUp from "./components/signing/SignUp";
import ResetPW from "./components/signing/ResetPW";
import Test from "./tests/TestResize";
// import TestDB from "./components/TestDB";

// import StripeContainer from "./components/stripe/StripeContainer";
import Checkout from "./components/checkout/Checkout";
import Success from "./components/checkout/Success";
import Canceled from "./components/checkout/Canceled";
// import "./App.css";

function App() {
  const classes = useStyles();
  
  const [groups, setGroups] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("none");
  const [cartItems, setCartItems] = useState([]);
  const cartSummary = useRef({
    itemsPrice: 0,
    taxPrice: 0,
    qtyTotal: 0,
    shippingPrice: 0,
    totalPrice: 0,
  })

  // run once
  useEffect( () => {
    getFromFS("groups", setGroups );
    getFromFS("products", setProducts );
    getFromFS("items", setItems );
  }, []);
  

  useEffect( () => {
    getUser(user, setUser);
  }, [user]);

  if (products) {}
  
  // useEffect( () => 
  //   console.log(2, groups),
  //   [groups]
  // )
  
  // useEffect( () => 
  //   console.log(2, products),
  //   [products]
  // )
  
  // useEffect( () => 
  //   console.log(2, items),
  //   [items]
  // )
  
  // console.log("App cart items", cartItems);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar user={user} setUser={setUser} cartItems={cartItems} className={classes.header}/>
        <Switch>
          <Route path="/Shop/:groupCode" render={(props) => 
            <Shop 
              cartItems={cartItems} setCartItems={setCartItems}
              groups={groups} products={products} items={items} 
              {...props}/>} />

          <Route path="/Shop" render={(props) => 
            <Shop 
              cartItems={cartItems} setCartItems={setCartItems}
              groups={groups} products={products} items={items}
              {...props}/>} />

          <Route path="/Cart" render={(props) => 
            <Cart cartItems={cartItems} setCartItems={setCartItems} 
              cartSummary={cartSummary}
              {...props}
              />
            } />

          <Route path="/Checkout/Success" render={(props) => 
            <Success {...props}/>
          } />

          <Route path="/Checkout/Canceled" render={(props) => 
            <Canceled {...props}/>
          } />

          <Route path="/Checkout" render={(props) => 
            <Checkout cartItems={cartItems} user={user} 
            cartSummary={cartSummary}
            {...props}
            />
          } />

          <Route path="/LogIn" render={(props) => 
            <LogIn user={user} setUser={setUser} {...props}/>} />

          <Route path="/SignUp" render={(props) => 
            <SignUp  user={user} setUser={setUser} {...props}/>} />

          <Route path="/ResetPW" render={(props) => 
            <ResetPW {...props}/>} />

          <Route path="/Test" render={(props) => 
            <Test
              cartItems={cartItems} setCartItems={()=>setCartItems}
              groups={groups} products={products} items={items}
              {...props}/>} />
          
          <Route path="/" render={(props) => <Home groups={groups} {...props}/>} />

        </Switch>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
