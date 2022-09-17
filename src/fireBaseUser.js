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
import hittiteNames from "./myscripts/names.json";

let userSub = localStorage.getItem("usersub");

async function randomUsernameGenerator() {
  let randomName =
    hittiteNames[Math.floor(Math.random() * hittiteNames.length)];
  const userData = collection(firestore, "userData");
  const q = query(userData, where("username", "==", randomName));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return randomName;
  } else {
    randomUsernameGenerator();
  }
}

export const getUser = async (newUserSub = null, newUserEmail = null) => {
  if (userSub || newUserSub) {
    const userData = collection(firestore, "userData");
    // for docs of collection userData get user with username
    let user;
    if (userSub) {
      user = query(userData, where("sub", "==", userSub));
    } else {
      user = query(userData, where("sub", "==", newUserSub));
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
      const newUserName = await randomUsernameGenerator();
      const newUser = await addDoc(userData, {
        sub: newUserSub,
        email: newUserEmail,
        username: newUserName,
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
