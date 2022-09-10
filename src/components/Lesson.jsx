import React from "react";
import { useParams } from "react-router-dom";
import db from "../myscripts/cuneiform.json";
import Quiz from "./Quiz";
import IntroduceSigns from "./IntroduceSigns";
import "../App.css";
import {
  Grommet,
  Box,
  AccordionPanel,
  Page,
  PageContent,
  Main,
  Accordion,
  PageHeader,
  Anchor,
  Button,
  Nav,
} from "grommet";
import { Book, CircleQuestion } from "grommet-icons";

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

function getWords(signs) {
  let words = db.__collections__.words;
  // words is an object, so we need to convert it to an array
  let words_array = Object.values(words);
  numberOfTotalWords = words_array.length;
  let previos_signs = signs.slice(0, signs.length - 5);
  let lesson_words = [];
  // for each word, check if word.hzls is a subset of signs
  for (let word of words_array) {
    let hzls = word.hzls;
    if (hzls.every((val) => signs.includes(val))) {
      // check if word.hzls is not a subset of previos_signs
      if (!hzls.every((val) => previos_signs.includes(val))) {
        lesson_words.push(word);
      }
    }
  }
  numberOfLessonWords = lesson_words.length;
  return lesson_words;
}

export default function Lesson() {
  let lesson_id = useParams().id;
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
              " words that you can read in this lesson. These words are all attested in the corpus of Hittite texts."
            }
          />
          <Nav
            align="stretch"
            flex={false}
            background={{ color: "graph-2" }}
            justify="start"
            direction="row"
            pad="small"
            gap="large"
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
