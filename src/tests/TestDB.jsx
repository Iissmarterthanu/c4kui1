import React from 'react';
import { db } from '../firebase/config';
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

function TestDB(props) {

  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const handleClick = async (e) => {
    const data = {
      name: "Tokyo1",
      country: "Japan",
      created: serverTimestamp()
    };
  
    console.log("click ", data)
    // Add a new document with a generated id.
    // const docRef = await addDoc(collection(db, "cities"), data);
   
    const docRef = doc(db, "cities", "ACDC@yah.coms");
    console.log("docRef: ", docRef)
    
    // Add a new document
    try {
      await setDoc(docRef, data);
    } catch (ev) {
      console.log("error: ", ev);
    } finally {
      console.log("Document added with ID: ", docRef.id);
    }

    
    // update a document
    await delay(5000);
    await updateDoc(docRef, {lastLogIn: serverTimestamp()});
    console.log("Document updated with ID: ", docRef.id);
  };


  return (
    <div>
      <button onClick={handleClick}>test db</button>      
    </div>
  );
}

export default TestDB;