import React from 'react';
import { Typography } from '@material-ui/core';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

const Blurb = () => {

  return (
      <Container align="center" maxWidth="md">
        <Box
          sx={{
            marginTop: '1em',
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'center',
            bgcolor: 'background.paper',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            fontWeight: 'bold',
          }}
        >
          <Typography variant="h4" gutterBottom >Martingale or Clip</Typography>
          <Typography variant="h6" align="left" gutterBottom>
            Why choose a {" "}
            <a
              href="https://en.wikipedia.org/wiki/Martingale_(collar)"
              target="_blank"
              rel="noreferrer"
              >
              Martingale
            </a>
            {" "} design over a clip collar? The answer is because it's a great walking collar. The collar slips over the head and is designed using two loops. Like a choke collar, it will tighten when the dog pulls but unlike a choke collar it won't actually choke the dog. When the dog stops pulling, the tension on the collar is released and the collar goes back into a relaxed position. 
          </Typography>
          <Typography variant="h6" align="left" gutterBottom>
            This design is especially great for sighthounds as they are able to stand on their back legs and back out of a normal collar but they can never do that with a martingale design collar. Please note we have sold this collar from small dogs to Great Danes its just a great walking collar.  
            We sell both styles martingale and clip collars.
          </Typography>
          <Typography variant="h4" gutterBottom >Mix & Match</Typography>
          <Typography variant="h6" align="left" gutterBottom>
            All our collars designs can be made either as a clip collar or as a martingale collar. If you would like a different design then please contact us via email info@collarforkings.com.
          </Typography>
        </Box>
      </Container>
  );
}

export default Blurb;