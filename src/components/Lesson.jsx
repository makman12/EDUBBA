import React from "react";
import { useParams } from "react-router-dom";
import db from "../myscripts/cuneiform.json";
import Quiz from "./Quiz";
import IntroduceSigns from "./IntroduceSigns";

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

function getWords(signs) {
  let words = db.__collections__.words;
  // words is an object, so we need to convert it to an array
  let words_array = Object.values(words);
  const numberOfTotalWords = words_array.length;
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
  return lesson_words;
}

export default function Lesson() {
  let lesson_id = useParams().id;
  let signs = getSigns(0, lesson_id * 5);
  // get last five signs in lesson_signs
  let lesson_signs = signs.slice(-5);
  let words = getWords(signs);

  return (
    <div>
      <h1>Lesson: {lesson_id}</h1>
      <IntroduceSigns signs={lesson_signs} />
      <br />
      <Quiz words={words} />
    </div>
  );
}
