import { Button, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const Success = ({ history }) => {

  return (
      <div className='checkout'>
        <Typography variant="h4" gutterBottom>Thank you for your order</Typography>
        <Typography variant="h5">We are currently processing your order and 
          will send you a confirmation email shortly
        </Typography>
        <div>
          <Button className='button is-black nomad-btn submit' 
          onClick={() => history.push('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
  );
}

export default withRouter(Success);