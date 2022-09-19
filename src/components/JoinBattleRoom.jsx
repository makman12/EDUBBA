import React from "react";
import { Button, TextInput, Box } from "grommet";
import { firestore, useCollectionData, firebase } from "../firebaseConfig";
import { MainContext, useContext } from "../context";
import ShowBattleRoom from "./ShowBattleRoom";

export default function JoinBattleRoom() {
  const { userData, setUserData } = useContext(MainContext);
  const beforeJoinBox = React.useRef();
  const roomIdInput = React.useRef();
  const [showRoomBox, setShowRoomBox] = React.useState(<></>);

  function joinHandler() {
    let roomId = roomIdInput.current.value;
    const uid = userData.sub;
    const username = userData.username;
    const roomRef = firestore.collection("rooms").doc(roomId);
    // if room doesn't exist, alert user
    roomRef.get().then((doc) => {
      if (!doc.exists) {
        alert("Room doesn't exist");
        return;
      }
    });
    function randomDarkColor() {
      // create a 5 char random string from a-z and 0-9
      let result = "#";
      const characters = "456789ABCDEF";
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const color = randomDarkColor();
    // add user to room
    roomRef.collection("users").doc(uid).set({
      username,
      uid,
      score: 0,
      joinTime: firebase.firestore.FieldValue.serverTimestamp(),
      color,
    });
    beforeJoinBox.current.style.display = "none";
    setShowRoomBox(<ShowBattleRoom roomId={roomId} />);
  }

  return (
    <>
      <Box gap="medium" pad="large" ref={beforeJoinBox}>
        <TextInput
          placeholder="Battle Room ID"
          size="xxlarge"
          textAlign="center"
          ref={roomIdInput}
        />
        <Button primary label="Join!" size="large" onClick={joinHandler} />
      </Box>
      {showRoomBox}
    </>
  );
}
