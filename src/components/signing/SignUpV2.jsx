import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useAuth } from '../../contexts/AutContext';
// import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import { db } from '../../firebase/config';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailList, setMailList] = useState(false);


  const addUserToDB = async (e) => {
    const data = {
      fName: firstName,
      lName: lastName,
      email: email,
      mailList: mailList,
      created: serverTimestamp()
    };
    console.log("click ", data)
    
    const docRef = doc(db, "users", email);
    console.log("docRef: ", docRef)
    
    // Add a new document
    try {
      await setDoc(docRef, data);
    } catch (ev) {
      console.log("error: ", ev);
    } finally {
      console.log("Document added with ID: ", docRef.id);
    }      
  };

  const mySubmitHandler = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email);
    
    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    } finally {};

    setLoading(false)

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMailList(false);
  }

  const myChangeHandler = (event) => {
    // console.log(event.target.name, event.target.value);
    switch(event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        return;
      case 'lastName':
        setLastName(event.target.value);
        return;
      case 'email':
        setEmail(event.target.value);
        return;
      case 'password':
        setPassword(event.target.value);
        return;
      case 'mailList':
        setMailList(!mailList)
        return;
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
          Sign up
        </Typography>
        <form 
          className={classes.form} 
          noValidate
          onSubmit={mySubmitHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={myChangeHandler}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={myChangeHandler}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={myChangeHandler}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={myChangeHandler}
                />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox 
                    value={mailList} 
                    name="mailList" 
                    color="primary" 
                    checked={mailList}
                    onChange={myChangeHandler}
                  />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>

          {/* // for testing 
          <Button onClick={addUserToDB}>test</Button> */}

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/LogIn" 
                variant="body1"  
                color="textPrimary"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}