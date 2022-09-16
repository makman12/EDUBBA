import { firestore } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";

let username = localStorage.getItem("nickname");

export const getUser = async (nickname = null) => {
  if (username || nickname) {
    const userData = collection(firestore, "userData");
    // for docs of collection userData get user with username
    let user;
    if (username) {
      user = query(userData, where("username", "==", username));
    } else {
      user = query(userData, where("username", "==", nickname));
    }
    // get user data
    const userSnapshot = await getDocs(user);
    // get user id
    let userId;
    if (userSnapshot.docs.length === 0) {
      // create a newuser with username score: 0
      const mistakes = collection(firestore, "mistakes");
      const signs = collection(firestore, "signs");
      const newMistakes = await addDoc(mistakes, {});
      const newSigns = await addDoc(signs, {});

      const newUser = await addDoc(userData, {
        username: nickname,
        score: 0,
        mistakes: newMistakes,
        signs: newSigns,
      });
      userId = newUser.id;
    } else {
      userId = userSnapshot.docs[0].id;
    }
    // get user data
    const userDataSnapshot = await getDoc(doc(firestore, "userData", userId));
    // get user data
    const userDataData = userDataSnapshot.data();
    userDataData.id = userId;
    // return user data
    return userDataData;
  } else {
    return null;
  }
  // for docs of collection userData
};
