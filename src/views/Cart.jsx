import { Box, Button, Container, IconButton, Typography } from '@material-ui/core';
import useStyles from './cartStyles';
import React from 'react';
import { Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useHistory } from "react-router-dom";



function Cart({cartItems, setCartItems}) {
  const classes = useStyles();

  const history = useHistory();

  const itemsPrice = cartItems.reduce( (a, c) => a + c.price * c.qty, 0); 
  const taxPrice = itemsPrice * 0;
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)
  const shippingPrice = qtyTotal * 15 * 0.9 ** qtyTotal;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const handlePlusMinus = (event, pickItem, num) => {
    console.log("cart cart:", pickItem, num);
   
    cartItems.map(item => console.log(pickItem.id, item.id,
      item.id === pickItem.id ?
      {...item, qty: Number(item.qty) + num } : 
      item
    ));
    
    if ( Number(pickItem.qty) === 1 && num === -1 )  {
      console.log("remove");
      setCartItems(cartItems.filter(item => item.id !== pickItem.id ));
    } else {
      console.log("increment");
      setCartItems(cartItems.map(item => item.id === pickItem.id ?
        {...item, qty: Number(item.qty) + num } : 
        item));
    };
    
    console.log("cart cart:", cartItems);

  };
  
  const handleCheckOut = (event) => {
    event.preventDefault();
    console.log("cart checkout", totalPrice);
    history.push("/CheckOut");

  }

  return (
  
    <div>
      <Box
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
                    <Typography varient="body1">{item.id} / {item.size}</Typography>
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
                <TableCell colSpan={3}><Typography varient="body1">Subtotal</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{itemsPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}><Typography varient="body1">Tax</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{`${(0.00 * 100).toFixed(0)} %`}</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{taxPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}><Typography varient="body1">Shipping</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{shippingPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3}><Typography varient="body1">Total</Typography></TableCell>
                <TableCell align="right"><Typography varient="body1">{totalPrice.toFixed(2)}</Typography></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        
        <Button onClick={handleCheckOut}>Check Out</Button>

      </Box>
      

    </div>
  );
}

export default Cart