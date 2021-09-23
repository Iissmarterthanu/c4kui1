import React from 'react';
import { Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useStyles from './spotlightStyles';
import CardGroup from '../cards/CardGroup';


const Spotlight = ({groups}) => {
  const classes = useStyles();

  // console.log("spotlight", groups);

  return (
    <div className="carousel-wrapper">
      <CssBaseline/>
      <Typography variant="h4" align="center" className={classes.spotlight}>
        Our Products
      </Typography>
      <Container style={{padding: "0em 2em"}}>
        <Grid container spacing={2}>
          {groups.map((group)=>(
            <Grid key={group.id} item xs={12} sm={6} md={4} lg={3}>
              <CardGroup group={group} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Spotlight;