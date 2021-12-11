import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Container from '@mui/material/Container';
import picture from '../../assets/Marguerite.jpg';

const About = ({ history }) => {

  return (
      <Container align="center" maxWidth="sm">
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <Typography variant="h6" align="left" gutterBottom>
        I wanted to take a moment and introduce myself and the rest of my team. 
        </Typography>
        <img src={picture} alt=""/>
        <Typography variant="body1" align="left" gutterBottom>
        I started this business in 2014 as a way to support my rescue endeavors in Qatar. 
        From a very young age I have always loved animals and when I went to Qatar with my husband, 
        I saw that so many animals were living horrible lives on the street and I wanted to help. 
        I noticed that I could not find any martingale collars in the country thus Collars for Kings was created because of this void. 
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
        Over the years my husband and I have fostered over 60 dogs, 
        have taken nearly 20 dogs to North America to their forever homes. 
        I have fed street dogs, spayed and neutered them, 
        I have paid for dog crates so dogs could travel out of Qatar, 
        and I have paid for surgeries for dogs with broken bones and 
        I managed to do all of this because people supported my little business. 
        </Typography>
        <Typography variant="body1" align="left" gutterBottom>
        As I head into retirement I am passing the torch to my son and daughter-inlaw and 
        we will now give 10% of our profits to rescue groups.
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

export default withRouter(About);