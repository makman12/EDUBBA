import React from "react";
import { useParams } from "react-router-dom";
import db from "../myscripts/cuneiform.json";
import Quiz from "./Quiz";
import IntroduceSigns from "./IntroduceSigns";
import "../App.css";
import {
  Box,
  Page,
  PageContent,
  Main,
  PageHeader,
  Anchor,
  Nav,
  Tip,
} from "grommet";
import { Book, CircleQuestion, Next, Previous } from "grommet-icons";
import { Link } from "react-router-dom";

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

let numberOfTotalWords = 0;
let numberOfLessonWords = 0;
let wordsSoFar = 0;

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

export default function Lesson() {
  let lesson_id = useParams().id;
  let actions = [
    <Link to={"/lesson/" + (+lesson_id - 1)}>
      <Anchor icon={<Previous />} label="Previous Lessson" />
    </Link>,
    <Link to={"/lesson/" + (+lesson_id + 1)}>
      <Anchor icon={<Next />} label="Next Lessson" />
    </Link>,
  ];
  // if lesson_id is 1 then remove first action
  if (lesson_id == 1) {
    actions.shift();
  }
  let signs = getSigns(0, lesson_id * 5);
  // get last five signs in lesson_signs
  let lesson_signs = signs.slice(-5);
  let words = getWords(signs);
  // shuffle words
  words.sort(() => Math.random() - 0.5);

  function handleNav(e, tab) {
    let tabs = ["signs", "practice"];
    // set display non for all tabs except tab use animation
    for (let t of tabs) {
      if (t !== tab) {
        document.getElementById(t).className = "passiveTab";
      }
    }
    document.getElementById(tab).className = "activeTab";
  }

  return (
    <Main>
      <Page>
        <PageContent>
          <PageHeader
            title={"Lesson " + lesson_id}
            subtitle={
              "There are " +
              numberOfLessonWords +
              " words that you can read in this lesson. These words are all attested in the corpus of Hittite texts. After this lesson you will be able to read " +
              Math.round((wordsSoFar / numberOfTotalWords) * 1000) / 10 +
              "% of the corpus."
            }
            actions={actions}
          />
          <Nav
            align="stretch"
            flex={false}
            background={{ color: "graph-2" }}
            justify="start"
            direction="row"
            pad="small"
            gap="medium"
            margin="none"
          >
            <Anchor
              icon={<Book />}
              label="Learn"
              color="light-1"
              size="medium"
              onClick={(e) => handleNav(e, "signs")}
            />

            <Anchor
              icon={<CircleQuestion />}
              label="Practice"
              color="light-1"
              size="medium"
              onClick={(e) => handleNav(e, "practice")}
            />
          </Nav>
          <Box
            pad="medium"
            background="light-2"
            id="signs"
            className="activeTab"
          >
            <IntroduceSigns signs={lesson_signs} />
          </Box>
          {/* set display none for box#practice*/}
          <Box
            pad="medium"
            background="light-2"
            id="practice"
            className="passiveTab"
          >
            <Quiz words={words} />
          </Box>
        </PageContent>
      </Page>
    </Main>
  );
}
