import React, { useState } from "react";
import { MainContext, useContext } from "../context";
import { Box, PageHeader } from "grommet";
import { firestore, useCollectionData, firebase } from "../firebaseConfig";

export default function Online() {
  const { userData, setUserData } = useContext(MainContext);
  if (!userData) return null;
  function ChatRoom() {
    const dummy = React.useRef();
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
      e.preventDefault();

      const uid = userData.sub;

      await messagesRef.add({
        text: formValue,
        username: userData.username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
      });

      setFormValue("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <>
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <button type="submit" disabled={!formValue}>
            🕊️
          </button>
        </form>
      </>
    );
  }

  function ChatMessage(props) {
    console.log(userData);
    const { text, uid, username } = props.message;

    const messageClass = uid === userData.sub ? "sent" : "received";

    if (messageClass === "sent") {
      return (
        <>
          <Box align="end" background="brand">
            {text}
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box align="start">
            <Box background="graph-1" pad="small">
              {username} : {text}
            </Box>
          </Box>
        </>
      );
    }
  }

  return <ChatRoom />;
}
