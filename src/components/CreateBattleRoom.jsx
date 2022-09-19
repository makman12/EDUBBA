import React from "react";
import {
  Button,
  Box,
  PageHeader,
  Text,
  Select,
  CheckBox,
  Carousel,
  Grid,
  ResponsiveContext,
  DataTable,
  Heading,
} from "grommet";
import lessonsObject from "../myscripts/lessons.json";
import HzlCuneiform from "./HzlCuneiform";
import CountDown from "./CountDown";
import {
  firestore,
  useCollectionData,
  firebase,
  useDocumentData,
} from "../firebaseConfig";
import { MainContext, useContext } from "../context";
import db from "../myscripts/cuneiform.json";

function randomRoomID() {
  // create a 5 char random string from a-z and 0-9
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getLessonSigns(lessonId) {
  return lessonsObject[lessonId];
}

function getLessonSignsSoFar(lessonId) {
  let signsSoFar = [];
  for (let i = 1; i <= lessonId; i++) {
    signsSoFar = signsSoFar.concat(getLessonSigns(i));
  }
  return signsSoFar;
}
const roomId = randomRoomID();

export default function CreateBattleRoom() {
  const { userData, setUserData } = useContext(MainContext);

  React.useEffect(() => {
    if (!userData) return;
    const uid = userData.sub;
    const username = userData.username;
    // delete room with uid and diffrent roomId room.collection("users")

    const roomRef = firestore.collection("rooms").doc(roomId);
    // look for the room with uid and delete
    // create inner collection for users
    const room = {
      id: roomId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      username,
      started: false,
      lessonId: 1,
      numberOfQuestions: 10,
      signs: getLessonSignsSoFar(1),
      timeLimit: 10,
      onlyPhonetic: false,
      mixedValue: false,
    };
    roomRef.set(room);
  }, [userData]);

  // when destroying the component, delete the room
  /*
  React.useEffect(() => {
    return () => {
      const roomRef = firestore.collection("rooms").doc(roomId);
      roomRef.delete();
    };
  }, []);
*/
  const roomRef = firestore.collection("rooms").doc(roomId);
  const roomDoc = useDocumentData(roomRef);
  const roomData = roomDoc[0];
  const [signsBox, setSignsBox] = React.useState(<></>);

  const [lesson, setLesson] = React.useState(1);

  // creale a lessons array start at 1 and end at 50
  const lessons = Array.from(Array(50).keys()).map((i) => i + 1);

  function renderSigns(lesson) {
    // for i in range(1, lesson + 1): append signsBox <HzlCuneiform signs={getLessonSigns(i)} />
    let signsBox = [];
    for (let i = 1; i <= lesson; i++) {
      signsBox.push(
        <Box pad="large" align="center" key={i}>
          <HzlCuneiform signs={getLessonSigns(i)} />
        </Box>
      );
    }
    let carousel = (
      <Carousel fill={true} pad="large">
        {signsBox}
      </Carousel>
    );
    setSignsBox(carousel);
    // set lesson in room
    const roomRef = firestore.collection("rooms").doc(roomId);
    roomRef.update({ lessonId: lesson, signs: getLessonSignsSoFar(lesson) });
  }

  function startHandler() {
    // set started to true
    const roomRef = firestore.collection("rooms").doc(roomId);
    roomRef.update({ started: true });
  }
  if (!roomData) return <></>;
  return (
    <>
      {!roomData.started && (
        <>
          <PageHeader title={"Room ID: " + roomId} />
          <Box gap="medium" pad="large">
            <Box gap="xlarge" align="center">
              {signsBox}
            </Box>

            <Select
              options={lessons}
              placeholder="Select Lesson"
              value={lesson}
              valueLabel={
                <Text size="medium" margin="small">
                  Lesson {lesson}
                </Text>
              }
              onChange={({ option }) => {
                setLesson(option);
                renderSigns(option);
              }}
            />
            <Select
              options={[10, 15, 20, 25, 30]}
              placeholder="Select Time Limit"
              valueLabel={(option) => (
                <Text size="medium" margin="small">
                  {option} seconds
                </Text>
              )}
              onChange={({ option }) => {
                const roomRef = firestore.collection("rooms").doc(roomId);
                roomRef.update({ timeLimit: option });
              }}
            />
            <Select
              options={[10, 15, 20, 25, 30]}
              placeholder="Number of Questions"
              valueLabel={(option) => (
                <Text size="medium" margin="small">
                  {option} Questions
                </Text>
              )}
              onChange={({ option }) => {
                const roomRef = firestore.collection("rooms").doc(roomId);
                roomRef.update({ numberOfQuestions: option });
              }}
            />
            <CheckBox
              label="Only Phonetic"
              onChange={(event) => {
                const roomRef = firestore.collection("rooms").doc(roomId);
                roomRef.update({ onlyPhonetic: event.target.checked });
              }}
            />
            <CheckBox
              label="Mixed Value"
              onChange={(event) => {
                const roomRef = firestore.collection("rooms").doc(roomId);
                roomRef.update({ mixedValue: event.target.checked });
              }}
            />

            <Button
              primary
              label="Start Battle!"
              size="large"
              onClick={startHandler}
            />
          </Box>
          <UsersTable roomId={roomId} />{" "}
        </>
      )}
      {roomData.started && <BattleRoom roomId={roomId} />}
    </>
  );
}

function getWords(signs, onlyPhonetic) {
  let words = db.__collections__.words;
  // words is an object, so we need to convert it to an array
  let words_array = Object.values(words);
  let previos_signs = signs.slice(0, signs.length - 5);
  let lesson_words = [];
  // for each word, check if word.hzls is a subset of signs
  let wordsSoFarList = [];
  for (let word of words_array) {
    let hzls = word.hzls;
    if (hzls.every((val) => signs.includes(val))) {
      wordsSoFarList.push(word);
      // check if word.hzls is not a subset of previos_signs
      if (!hzls.every((val) => previos_signs.includes(val))) {
        lesson_words.push(word);
      }
    }
  }
  if (onlyPhonetic) {
    // remove words that word that lowercase of word.word is not equal to word.word
    lesson_words = lesson_words.filter((word) => {
      return word.word.toLowerCase() === word.word;
    });
  }
  return lesson_words;
}

async function questionMaker(
  lessonId,
  numberOfQuestions,
  onlyPhonetic,
  roomId
) {
  const signs = getLessonSignsSoFar(lessonId);
  let allwords = getWords(signs, onlyPhonetic);
  // shuffle the words
  allwords = allwords.sort(() => Math.random() - 0.5);
  let questions = allwords.slice(0, numberOfQuestions);
  // for each question, create a question give an id
  let questionsWithId = [];
  for (let i = 0; i < questions.length; i++) {
    questionsWithId.push({
      ...questions[i],
      id: i,
    });
  }
  questions = questionsWithId;
  // wrte to firestore
  const roomRef = firestore.collection("rooms").doc(roomId);
  const questionsRef = roomRef.collection("questions");
  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    let questionRef = questionsRef.doc(question.id.toString());
    questionRef.set(question);
  }
  const answersRef = roomRef.collection("answers").doc(roomId);
}

function BattleRoom({ roomId }) {
  const [questionTime, setQuestionTime] = React.useState(true);
  React.useEffect(() => {
    // check if room.questions is empty
    const roomRef = firestore.collection("rooms").doc(roomId);
    const questionsRef = roomRef.collection("questions");

    roomRef.onSnapshot((doc) => {
      let roomData = doc.data();
      questionsRef.onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {
          questionMaker(
            roomData.lessonId,
            roomData.numberOfQuestions,
            roomData.onlyPhonetic,
            roomId
          );
          roomRef.update({ currentQuestion: 0 });
          roomRef.update({ questionTime: true });
          roomRef.update({ finished: false });
        } else {
        }
      });
    });
  }, []);
  const roomRef = firestore.collection("rooms").doc(roomId);
  const roomDoc = useDocumentData(roomRef);
  const roomData = roomDoc[0];
  const [signsBox, setSignsBox] = React.useState(<></>);
  const questionsRef = roomRef.collection("questions");
  const questionsDoc = useCollectionData(questionsRef);

  // check if questionsDoc is empty

  if (!roomData) return <>data yok</>;
  if (!questionsDoc[0]) {
    return <>soru yok</>;
  } else {
    if (questionsDoc[0].length === 0) {
      return <>questions yok</>;
    }
  }

  // check answers and update score
  function checkAnswers() {}
  // question timeOut function
  function questionTimeOut() {
    roomRef.update({ questionTime: false });
    setQuestionTime(false);
  }
  function nextQuestion() {
    if (roomData.currentQuestion < roomData.numberOfQuestions - 1) {
      roomRef.update({ currentQuestion: roomData.currentQuestion + 1 });
    } else {
      roomRef.update({ finished: true });
    }
    roomRef.update({ questionTime: true });
    setQuestionTime(true);
  }

  return (
    <>
      <PageHeader
        title={
          "Question  " +
          (+roomData.currentQuestion + 1) +
          "/" +
          roomData.numberOfQuestions
        }
      />
      <Box gap="medium" pad="large">
        {questionTime && (
          <Question
            questionData={questionsDoc[0][roomData.currentQuestion]}
            roomData={roomData}
            questionTimeOut={questionTimeOut}
          />
        )}
        {!questionTime && (
          <>
            <Box align="center" alignContent="center">
              <HzlCuneiform
                signs={questionsDoc[0][roomData.currentQuestion].syllabic_hzl}
                size={100}
              />
              <Heading level="2">
                {questionsDoc[0][roomData.currentQuestion].word}
              </Heading>
            </Box>
            {!roomData.finished && (
              <Button
                primary
                label="Next Question"
                size="large"
                onClick={nextQuestion}
              />
            )}
            {roomData.finished && (
              <Button
                primary
                label="Play Again"
                size="large"
                onClick={() => {
                  roomRef.update({ started: false });
                }}
              />
            )}
            <ScoreTable roomId={roomId} />
          </>
        )}
      </Box>
    </>
  );
}

function Question({ questionData, roomData, questionTimeOut }) {
  return (
    <Box gap="medium" align="center">
      <Text size="xlarge">
        <HzlCuneiform signs={questionData.syllabic_hzl} size={100} />
      </Text>
      <CountDown
        timeLimit={roomData.timeLimit}
        questionTimeOut={questionTimeOut}
      />
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
