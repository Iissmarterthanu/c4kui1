import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    margin: '10px'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: theme.primary
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container
        justify="flex-start"
        spacing={4}
        className={classes.grid}>
        <Grid item xs={12} >
          <Paper className={classes.paper}>footer</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;