import { auth } from "../firebase/config";
import { getAuth } from "firebase/auth";

async function getUser(user, setUser) {

  const auth = getAuth();
  const autUser = auth.currentUser;
  if (autUser) {
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
    // console.log("getUser autUser: ", autUser.email);
    setUser(autUser.email);
  } else {
    // No user is signed in.
    // console.log("no getUser: ");
    setUser("none");
  }
  
  // console.log("user", user);
  return user;
}

function logout(setUser) {
  setUser("none");
  return auth.signOut();
}

export { getUser, logout };