import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Container from '@mui/material/Container';

const Success = ({ history }) => {

  return (
      <Container align="center" maxWidth="sm">
        <Typography variant="h4" gutterBottom>Thank you for your order</Typography>
        <Typography variant="h5">We are currently processing your order and 
          will send you a confirmation email shortly
        </Typography>
        <div>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => history.push('/')}
            >
            Continue Shopping
          </Button>
        </div>
      </Container>
  );
}

export default withRouter(Success);