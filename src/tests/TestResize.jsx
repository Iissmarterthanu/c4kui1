import { Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Test(props) {
  const classes = useStyles();

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const [file, setFile] = useState("");
  
  const myChangeHandler = (event) => {
    setFile(event.target.value);
  }
  
  const mySubmitHandler = async (e) => {
    e.preventDefault();
    console.log("handleClick:", file);
    await delay(5000);
  };


  return (
    <Container component="main" maxWidth="s">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        image file
      </Typography>
      <form 
        className={classes.form} 
        // noValidate
        onSubmit={mySubmitHandler}
        >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="image"
          label="image"
          type="file"
          id="image"
          value={file}
          onChange={myChangeHandler}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
      </form>
    </div>
  </Container>
 );
}

export default Test;