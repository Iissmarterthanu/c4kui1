import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function ResetPW() {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  // const [remember, setRemember] = useState(false);

  const mySubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, pw);
    
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
    .then((userCredential) => {
        console.log("email sent");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
      });


    setEmail("");
    setPW("");
    // setRemember(false);
  }

  const myChangeHandler = (event) => {
    console.log(event.target.name, event.target.value);
    switch(event.target.name) {
      case 'email':
        setEmail(event.target.value);
        return;
      // case 'password':
      //   setPW(event.target.value);
      //   return;
      // case 'Remember me':
      //   setRemember(!remember)
      //   return;
      default:
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form 
          className={classes.form} 
          noValidate
          onSubmit={mySubmitHandler}
          >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={myChangeHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
}