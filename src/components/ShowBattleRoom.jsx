import React from "react";
import {
  DataTable,
  Button,
  Text,
  Box,
  ResponsiveContext,
  Grid,
  PageHeader,
  TextInput,
  Heading,
} from "grommet";
import {
  firestore,
  useCollectionData,
  firebase,
  useDocumentData,
} from "../firebaseConfig";
import { MainContext, useContext } from "../context";
import CountDown from "./CountDown";
import HzlCuneiform from "./HzlCuneiform";
import { compareAnswers } from "../myscripts/checkTransliterateAnswer";

export default function ShowBattleRoom(props) {
  console.log("ShowBattleRoom'a geldi");
  const { userData, setUserData } = useContext(MainContext);
  const { roomId } = props;
  // get room data
  const roomRef = firestore.collection("rooms").doc(roomId);
  const roomDoc = useDocumentData(roomRef);
  const roomData = roomDoc[0];

  // get users data
  const usersRef = roomRef.collection("users");
  const usersData = useCollectionData(usersRef, { idField: "id" })[0];

  if (!roomData) return <></>;
  // render room settings and users
  return (
    <Box gap="medium" pad="large">
      {!roomData.started && (
        <WatingScreen roomData={roomData} roomId={roomId} />
      )}
      {roomData.started && <AnswerScreen roomId={roomId} />}
    </Box>
  );
}

function AnswerScreen({ roomId }) {
  const roomRef = firestore.collection("rooms").doc(roomId);
  const usersRef = roomRef.collection("users");
  const roomDoc = useDocumentData(roomRef);
  const roomData = roomDoc[0];
  const { userData } = useContext(MainContext);
  const questionsRef = roomRef.collection("questions");
  const questionsDoc = useCollectionData(questionsRef);
  const textInputRef = React.useRef();
  const hiddenBox = React.useRef();
  const mainBox = React.useRef();
  const [resultBox, setResultBox] = React.useState(<></>);
  React.useEffect(() => {
    async function getQuestion(currentQuestionId) {
      console.log("getQuestion'a geldi", roomData);
    }
    if (roomData) {
      getQuestion(roomData.currentQuestion);
      setResultBox(<></>);
    }
  }, [roomData]);

  if (!roomData) return <></>;
  // get question
  async function checkAnswerAndScore() {
    console.log(userData);
    let answer = textInputRef.current.value;
    console.log(answer, "answer burda");
    let word = questionsDoc[0][roomData.currentQuestion].word;
    let result = compareAnswers(answer, word, roomData.mixedValue);
    console.log("result", result, answer, word);
    let score = questionsDoc[0][roomData.currentQuestion].hzls.length;
    if (result) {
      await usersRef.doc(userData.sub).update({
        score: firebase.firestore.FieldValue.increment(score),
      });
      setResultBox(
        <Box
          round
          pad="medium"
          background="status-ok"
          alignContent="center"
          align="center"
        >
          <Text>Correct!</Text>
        </Box>
      );
    } else {
      setResultBox(
        <Box
          round
          pad="medium"
          background="status-critical"
          alignContent="center"
          align="center"
        >
          <Text>Wrong!</Text>
        </Box>
      );
    }
    // make textInputref invisible
    hiddenBox.current.style.visibility = "hidden";

    // make mainBox background prop "dark-1"
  }

  return (
    <>
      {roomData.questionTime && (
        <Box gap="medium" pad="large" ref={mainBox}>
          <Text>Question: {roomData.currentQuestion + 1}</Text>
          <Box alignContent="center" align="center">
            <HzlCuneiform
              signs={questionsDoc[0][roomData.currentQuestion].syllabic_hzl}
            />
          </Box>

          <CountDown
            timeLimit={roomData.timeLimit}
            questionTimeOut={() => console.log("bitti")}
          />
          {resultBox}
          <Box ref={hiddenBox}>
            <TextInput placeholder="Transliterate!" ref={textInputRef} />
            <Button primary label="Submit" onClick={checkAnswerAndScore} />
          </Box>
        </Box>
      )}
      {!roomData.questionTime && (
        <Box gap="medium" pad="large">
          {roomData.finished && (
            <Heading alignSelf="center" level="2">
              Finished!
            </Heading>
          )}
          {!roomData.finished && (
            <Heading level="2" alignSelf="center">
              Waiting for next question!
            </Heading>
          )}
          <ScoreTable roomId={roomId} />
        </Box>
      )}
    </>
  );
}

function WatingScreen(props) {
  const [waitingText, setWaitingText] = React.useState("");
  // change waiting text every 2 second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const text = [
        `${props.roomData.username} waits Sun Goddess of Arinna to march on the battlefield`,
        `${props.roomData.username} needs to attain a festival, just be patient...`,
        `${props.roomData.username} is praying...`,
        `${props.roomData.username} is moving captial to Tarhuntassa... This will take a while...`,
        `${props.roomData.username} was called to the Wheel, just wait here...`,
        `All land of Kaska became hostile to ${props.roomData.username}... Give it a few minutes...`,
      ].sort(() => Math.random() - 0.5);
      setWaitingText(text[0]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  let roomData = props.roomData;
  let roomId = props.roomId;

  return (
    <Box gap="medium" pad="large">
      <PageHeader
        title={"Room: " + roomData.id}
        subTitle={"Created by: " + roomData.username}
      />
      <Text alignSelf="center" level="2" textAlign="center">
        {waitingText}
      </Text>
      <UsersTable roomId={roomId} />
    </Box>
  );
}

function UsersTable(params) {
  const size = React.useContext(ResponsiveContext);
  let roomId = params.roomId;
  const roomRef = firestore.collection("rooms").doc(roomId);
  const usersRef = roomRef.collection("users");
  const query = usersRef.orderBy("joinTime", "asc");
  const [users] = useCollectionData(query, { idField: "id" });
  // create a 25 member array of {username, score}
  if (!users) return <></>;
  // create a array 0f 5 xsmall
  return (
    <Box gap="medium" pad="large">
      <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
        {users.map((user) => (
          <Box
            gap="medium"
            align="center"
            background={{ color: user.color, opacity: "medium" }}
            round
            pad="small"
            animation={{ type: "fadeIn", duration: 1000 }}
          >
            <Box key={user.uid}>
              <Text>{user.username}</Text>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

function ScoreTable(params) {
  const size = React.useContext(ResponsiveContext);
  let roomId = params.roomId;
  const roomRef = firestore.collection("rooms").doc(roomId);
  const usersRef = roomRef.collection("users");
  const query = usersRef.orderBy("joinTime", "asc");
  const [users] = useCollectionData(query, { idField: "id" });
  // sort users by score

  if (!users) return <></>;
  users.sort((a, b) => b.score - a.score);
  // give index to users
  users.forEach((user, index) => {
    user.index = index + 1;
  });
  // color the first 3

  let rowProps = {
    1: { background: "#AF9500", pad: "medium" },
    2: { background: "#D7D7D7", pad: "small" },
    3: { background: "#AD8A56", pad: "small" },
  };

  return (
    <Box gap="medium" pad="large">
      <DataTable
        rowProps={rowProps}
        background={{
          header: "dark-2",
          body: ["white", "light-2"],
          footer: { dark: "light-2", light: "dark-3" },
        }}
        columns={[
          {
            property: "index",
            header: <Text>Rank</Text>,
            primary: true,
          },
          {
            property: "username",
            header: <Text>Scribe</Text>,
          },
          {
            property: "score",
            header: <Text>Score</Text>,
          },
        ]}
        data={users}
      />
    </Box>
  );
}
