import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory, withRouter } from "react-router-dom";
import { logout } from '../../hooks/useAuth';

import useStyles from './navbarStyles';
import { Box, Button, IconButton } from '@material-ui/core';
import logo from '../../assets/Collars for Kings logo.png';

const NavBar = ({user, setUser, cartItems}) => {
  const classes = useStyles();
  const history = useHistory();
  const qtyTotal = cartItems.reduce( (a, c) => a + c.qty, 0)
  
  // const click = () => getUser(user, setUser);
  
  const handleLogOut = () => {
    logout(setUser);
  };
  
  let inOut;
  if(user === "none") {
    inOut = 
    <Button onClick={()=>history.push("/LogIn")} >
      <Typography variant="h6" color="textSecondary">Log-In</Typography>
    </Button>;
  } else {
    inOut = 
    <Button onClick={handleLogOut} className={classes.link} >
      <Typography variant="h6" color="textSecondary">Log-Out</Typography>
    </Button>;
  } 
    

    
    return (
      <header>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>


          <Box display="flex" 
            justifyContent="center" 
            alignContent="center"
            m={0} p={0} 
            bgcolor="#fff">
            <img src={logo} height="65" />
            <Typography variant="body2" color="textPrimary">
              Collars for Kings
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Button onClick={()=>history.push("/")} >
              <Typography variant="h6" color="textSecondary">Home</Typography>
            </Button>
            <Button onClick={()=>history.push("/Shop")} >
              <Typography variant="h6" color="textSecondary">Shop</Typography>
            </Button>
            <Button onClick={()=>history.push("/Cart")} >
              <Typography variant="h6" color="textSecondary">Cart({qtyTotal})</Typography>
            </Button>
            <Button onClick={()=>history.push("/About")} >
              <Typography variant="h6" color="textSecondary">About Us</Typography>
            </Button>
            {inOut}
          </Box>

          </Toolbar>
        </AppBar>
        <div className={classes.grow} />
      </div>
    </header>
  );
}

export default withRouter(NavBar);