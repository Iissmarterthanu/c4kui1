import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
import { Alert } from '@material-ui/lab';

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

export default function LogIn({user, setUser}) {
  const classes = useStyles();

  // console.log("login 1: ", user)

  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  useEffect(() => {
    console.log("loggimg in");
    return () => {
      setEmail("");
      setPW(""); 
      setAlert(null);
    };
}, []);

  const mySubmitHandler = (e) => {
    e.preventDefault();
    // console.log(email, pw);
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pw)
    .then((userCredential) => {
        // Signed in 
        const autUser = userCredential.user;
        // console.log("signed in", email, pw, autUser.email);
        setUser(autUser.email);
        setAlert(null);
        history.push("/")
        setEmail("");
        setPW("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log("error", errorCode, errorMessage);
        setUser("none");
        setAlert(errorCode)
      });


    // setRemember(false);
  }

  const myChangeHandler = (event) => {
    // console.log(event.target.name, event.target.value);
    switch(event.target.name) {
      case 'email':
        setEmail(event.target.value);
        return;
      case 'password':
        setPW(event.target.value);
        return;
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
          Log in
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={pw}
            autoComplete="current-password"
            onChange={myChangeHandler}
          />
          {/* <FormControlLabel
            control={<Checkbox 
            value="remember not" 
            color="primary" />}
            label="Remember me"
            name="Remember me"
            checked={remember}
            onChange={myChangeHandler}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/ResetPW" variant="body1" color="textPrimary">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body1"  color="textPrimary">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <p/>
          {alert && <Alert severity="error"><Typography>{alert}</Typography></Alert>}
        </form>
      </div>
    </Container>
  );
}