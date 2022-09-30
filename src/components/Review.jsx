import React from "react";
import db from "../myscripts/cuneiform.json";
import Quiz from "./Quiz";
import IntroduceSigns from "./IntroduceSigns";
import "../App.css";
import { Box, PageHeader, Anchor, Nav } from "grommet";
import { Book, Transaction, Next, Previous, Edit, Layer } from "grommet-icons";
import lessonsObject from "../myscripts/lessons.json";
import SignFlashCards from "./SignFlashCards";
import { MainContext, useContext } from "../context";
import { getDoc } from "firebase/firestore";

function getSigns(start, end) {
  let signs = db.__collections__.signs;
  let ordered_signs = Object.values(signs).sort((a, b) => a.order - b.order);
  let lesson_signs = ordered_signs.slice(start, end);
  // for obj in lesson_signs: find key in signs
  let indexes = lesson_signs.map((obj) => {
    return Object.values(signs).indexOf(obj);
  });
  // increment by 1 to get the key
  indexes = indexes.map((index) => index + 1);
  // merge indexes with "," and return
  return indexes;
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

let numberOfTotalWords = 0;
let numberOfLessonWords = 0;
let wordsSoFar = 0;

function getWordsBySigns(knownSigns, problematicSigns) {
  let words = db.__collections__.words;
  // words is an object, so we need to convert it to an array
  let words_array = Object.values(words);
  numberOfTotalWords = words_array.length;
  let allSigns = knownSigns.concat(problematicSigns);
  let lesson_words = [];
  // for each word, check if word.hzls is a subset of signs
  let wordsSoFarList = [];
  for (let word of words_array) {
    let wordSigns = word.hzls;
    let isSubset = wordSigns.every((sign) => allSigns.includes(sign));
    if (isSubset) {
      wordsSoFarList.push(word);
      if (!wordSigns.every((sign) => knownSigns.includes(sign))) {
        lesson_words.push(word);
      }
    }
  }

  numberOfLessonWords = lesson_words.length;
  wordsSoFar = wordsSoFarList.length;
  return lesson_words;
}
function getWords(signs) {
  let words = db.__collections__.words;
  // words is an object, so we need to convert it to an array
  let words_array = Object.values(words);
  numberOfTotalWords = words_array.length;
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
  numberOfLessonWords = lesson_words.length;
  wordsSoFar = wordsSoFarList.length;
  return lesson_words;
}

export default function Review() {
  const { userData } = useContext(MainContext);
  const [signData, setSignData] = React.useState([]);
  const [knownSigns, setKnownSigns] = React.useState([]);
  const [problematicSigns, setProblematicSigns] = React.useState([]);
  React.useEffect(() => {
    async function getSignData() {
      if (!userData) return;
      let signs = userData.signs;
      const signDoc = await getDoc(signs);
      let newSignData = signDoc.data();
      setSignData(newSignData);
      // get signs that are less than 10
      let newProblemSigns = Object.keys(newSignData).filter(
        (key) => newSignData[key] < 10
      );
      // if len(newProblemSigns) > 5 order by count ascending get first 5
      if (newProblemSigns.length > 5) {
        newProblemSigns = newProblemSigns
          .sort((a, b) => newSignData[a] - newSignData[b])
          .slice(0, 5);
      }
      setProblematicSigns(newProblemSigns);
      // get signs that are greater than 10
      let newKnownSigns = Object.keys(newSignData).filter(
        (key) => newSignData[key] >= 10
      );
      setKnownSigns(newKnownSigns);
    }
    getSignData();
  }, [userData]);

  let signs = knownSigns.map((sign) => +sign);
  let lesson_signs = problematicSigns.map((sign) => +sign);
  let words = getWordsBySigns(signs, lesson_signs);
  // shuffle words
  words.sort(() => Math.random() - 0.5);

  function handleNav(e, tab) {
    let tabs = ["signs", "flashCards", "transliterate"];
    // set display non for all tabs except tab use animation
    for (let t of tabs) {
      if (t !== tab) {
        document.getElementById(t).className = "passiveTab";
      }
    }
    document.getElementById(tab).className = "activeTab";
  }

  let title = "Review";
  let subtitle =
    "You are struggling with these 5 signs. This review exercise will help you learn them.";

  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <Nav
        align="stretch"
        flex={false}
        background={{ color: "brand", opacity: "weak" }}
        justify="start"
        direction="row-responsive"
        pad="none"
        gap="medium"
        margin="none"
      >
        <Anchor
          icon={<Book />}
          label={
            <Box onClick={(e) => handleNav(e, "signs")} pad="medium">
              Signs
            </Box>
          }
          margin="none"
          size="medium"
          pad="medium"
        />
        <Anchor
          icon={<Layer />}
          label={
            <Box onClick={(e) => handleNav(e, "flashCards")} pad="medium">
              Flash Cards
            </Box>
          }
          margin="none"
          size="medium"
          pad="medium"
        />

        <Anchor
          icon={<Transaction />}
          margin="none"
          label={
            <Box onClick={(e) => handleNav(e, "transliterate")} pad="medium">
              Transliterate
            </Box>
          }
          size="medium"
        />
        {/*  <Anchor
              icon={<Edit />}
              label="Transliteration to Cuneiform"
              size="medium"
              onClick={(e) => handleNav(e, "write")}
            /> */}
      </Nav>
      <Box pad="medium" id="signs" className="activeTab">
        <IntroduceSigns signs={lesson_signs} />
      </Box>
      <Box pad="medium" id="flashCards" className="passiveTab">
        <SignFlashCards signs={lesson_signs} />
      </Box>
      {/* set display none for box#practice*/}
      <Box pad="medium" id="transliterate" className="passiveTab">
        <Quiz words={words} />
      </Box>
      <Box pad="medium" id="write" className="passiveTab"></Box>
    </>
  );
}
