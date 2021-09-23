import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { logout } from '../../hooks/useAuth';

import useStyles from './navbarStyles';
import { Box, Button } from '@material-ui/core';

export default function NavBar({user, setUser, cartItems}) {
  const classes = useStyles();
  const history = useHistory();
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)

  // const click = () => getUser(user, setUser);
  
  const handleLogOut = () => {
    logout(setUser);
  };

  let inOut;
  if(user === "none") {
    inOut = <Button onClick={()=>history.push("/LogIn")} >Log-In</Button>;
    } else {
      // inOut = <Link className={classes.link} to="/LogIn" >Log-Out</Link>;
      inOut = 
        <Button onClick={handleLogOut} className={classes.link} >
          Log-Out
        </Button>;
    } 
  


  return (
    <header>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>

          <Box display="flex" justifyContent="center" m={0} p={1} bgcolor="#E2E4E5">
            <Typography variant="body2" >
              Collars for Kings
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Button onClick={()=>history.push("/")} >Home</Button>
            <Button onClick={()=>history.push("/Shop")} >Shop</Button>
            <Button onClick={()=>history.push("/Cart")} >Cart({qtyTotal})</Button>
            {inOut}
          </Box>

          </Toolbar>
        </AppBar>
        <div className={classes.grow} />
      </div>
    </header>
  );
}
