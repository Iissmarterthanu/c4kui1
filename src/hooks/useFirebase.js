import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase/config";

// Get a list of groups from the database
async function getFromFS(col, callBack) {
  
  // var list = JSON.parse(localStorage.getItem(col));
  var list = null;
  // console.log("local storage", list);

  if (!list) {
    const ref = collection(db, col);
    const snapshot = await getDocs(ref);
    list = snapshot.docs.map(doc => doc.data());
    localStorage.setItem(col, JSON.stringify(list));
    console.log("db"); 
  }

  callBack(list)
  // console.log("fb", list);
  return list;
}

export { getFromFS };