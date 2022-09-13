import React from "react";
import CuneiformChoice from "./CuneiformChoice";
import { useState } from "react";

export default function ReverseQuiz(props) {
  let words = props.words;
  let signs = props.signs;

  let [quizId, setQuizId] = useState(0);
  let word = words[quizId];
  let choices = (
    <CuneiformChoice signs={signs} syllabicHzl={word.syllabicHzl} />
  );
  let question = <div>{word.word}</div>;
  return (
    <div>
      {question}
      {choices}
    </div>
  );
}
