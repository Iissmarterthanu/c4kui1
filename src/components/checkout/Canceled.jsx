import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Container from '@mui/material/Container';

const Canceled = ({ history }) => {

  return (
      <Container align="center" maxWidth="sm">
        <Typography variant="h4" gutterBottom>Payment failed</Typography>
        <Typography variant="h5">
          Payment was not successful
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

export default withRouter(Canceled); 
