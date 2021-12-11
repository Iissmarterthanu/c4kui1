import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from "react-router-dom";


function Cart({ cartItems, setCartItems, cartSummary, user }) {
  // const classes = useStyles();
  
  const history = useHistory();
  const [sCode, setSCode] = useState('Canada');
  const [svar, setSvar] = useState(12);
  

  useEffect(()=>{
    switch (sCode) {
      case "Calgary": 
        setSvar(0);        
        break;
      case "Alberta": 
        setSvar(0);        
        break;
      case "Canada": 
        setSvar(0);        
        break;
      case "US": 
        setSvar(10.5);        
        break;
      default:
        setSvar(16.5);        
        break;
    };
  },[sCode])
  
  const itemsPrice = Number(cartItems.reduce( (a, c) => a + c.price * c.qty, 0)); 
  const taxPrice = Number(itemsPrice * 0);
  const qtyTotal = Number(cartItems.reduce( (a, c) => a + c.qty, 0));
  const shippingPrice = Number((svar + (qtyTotal-1) * 3.5 * Math.min(svar,1)).toFixed(2));
  const totalPrice = Number((itemsPrice + taxPrice + shippingPrice).toFixed(2));
  // console.log("totalPrice", itemsPrice, shippingPrice, totalPrice);

  cartSummary.current = {
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    qtyTotal: qtyTotal,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
  }

  // console.log("cart summary", cartSummary.current.totalPrice);

  const handlePlusMinus = (event, pickItem, num) => {
    // console.log("cart cart:", pickItem, num);
   
    cartItems.map(item => console.log(pickItem.id, item.id,
      item.id === pickItem.id ?
      {...item, qty: Number(item.qty) + num } : 
      item
    ));
    
    if ( Number(pickItem.qty) === 1 && num === -1 )  {
      // console.log("remove");
      setCartItems(cartItems.filter(item => item.id !== pickItem.id ));
    } else {
      // console.log("increment");
      setCartItems(cartItems.map(item => item.id === pickItem.id ?
        {...item, qty: Number(item.qty) + num } : 
        item));
    };
    
    // console.log("cart cart:", cartItems);

  };
  
  const handleCheckOut = (event) => {
    event.preventDefault();
    // console.log("cart checkout", totalPrice);
    
    history.push("/CheckOut");

    // if (user==="none") {
    //   history.push("/LogIn");
    // } else {
    //   history.push("/CheckOut");
    // }
  }

  return (
  
    <div>
      <Box align="center"
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 1,
          p: 2,
          minWidth: 300,
          maxWidth: 1000,
          margin: "auto"
          }}
      > 
        <Typography variant="h4" align="center" gutterBottom>Cart Items</Typography>
      
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" >
            <TableHead>
              <TableRow>
                <TableCell><Typography varient="body1">ID/Size</Typography></TableCell>
                <TableCell><Typography varient="body1">Picture</Typography></TableCell>
                <TableCell><Typography varient="body1">Name</Typography></TableCell>
                <TableCell align="center"><Typography varient="body1">Quantity</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">Price Each</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">Total</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  
                  <TableCell component="th" scope="row">
                    <Typography varient="body1">{item.id}</Typography>
                  </TableCell>
                  <TableCell scope="row">
                    <img src={item.image} width="89" height="45" alt="preview"/>
                  </TableCell>
                  <TableCell><Typography varient="body1">{item.name}</Typography></TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(event) => handlePlusMinus(event, item, +1)}>
                      +
                    </IconButton>
                    <Typography style={{paddingInline: "1em"}} display="inline" varient="body1">
                      {item.qty}
                    </Typography>
                    <IconButton onClick={(event) => handlePlusMinus(event, item, -1)}>
                      -
                    </IconButton>
                  </TableCell>
                  <TableCell align="right"><Typography varient="body1">{item.price}</Typography></TableCell>
                  <TableCell align="right"><Typography varient="body1">{item.qty * item.price}</Typography></TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell colSpan={4}><Typography varient="body1">Subtotal</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{itemsPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}><Typography varient="body1">Tax</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{`${(0.00 * 100).toFixed(0)} %`}</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{taxPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}><Typography varient="body1">Shipping</Typography></TableCell>
                <TableCell colSpan={3}>
                  <Typography varient="body1">

                    <FormControl variant="outlined" >
                      <InputLabel id="shipping-code">destnation</InputLabel>
                      <Select
                        labelId="shipping-code"
                        id="sCode"
                        value={sCode}
                        onChange={(e) => setSCode(e.target.value)}
                        label="shipping"
                        // error={sCodeError}
                      >
                        <MenuItem key="1" value="Calgary">Calgary</MenuItem>    
                        <MenuItem key="2" value="Alberta">Alberta</MenuItem>    
                        <MenuItem key="3" value="Canada">Canada</MenuItem>    
                        <MenuItem key="4" value="US">US</MenuItem>    
                        <MenuItem key="5" value="UK">UK</MenuItem>    
                        {/* <MenuItem key="4" value="International">International</MenuItem>     */}
                      </Select>
                    </FormControl>

                  </Typography>
                </TableCell>
                <TableCell align="right"><Typography varient="body1">
                  {shippingPrice > 0 ? shippingPrice.toFixed(2) : "FREE"}
                </Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}><Typography varient="body1">Total</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{totalPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        
        <Button 
          onClick={handleCheckOut} 
          variant="contained" 
          color="secondary" 
        >
          Continue
          {/* {user==="none" ? "Log-In" : "Continue" } */}
        </Button>

      </Box>
      

    </div>
  );
}

export default Cart