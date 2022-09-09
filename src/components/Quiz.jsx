import React from "react";
import { Hzl_cuneiform } from "./Hzl_cuneiform";
import { useState } from "react";
// get props from parent component

function quizMaker(word) {
  let cuneiform = <Hzl_cuneiform signs={word.syllabic_hzl} />;
  let word_transcription = word.word;
  let question = <div>{cuneiform}</div>;
  return question;
}

function normalize(text) {
  text = text.toLowerCase().trim();
  text = text.replace(/í/g, "i");
  text = text.replace(/g/g, "k");
  text = text.replace(/b/g, "p");
  text = text.replace(/ì/g, "i");
  text = text.replace(/ú/g, "u");
  text = text.replace(/á/g, "a");
  text = text.replace(/é/g, "e");
  text = text.replace(/š/g, "s");
  text = text.replace(/ḫ/g, "h");
  text = text.replace(/d/g, "t");
  text = text.replace(/j/g, "y");
  text = text.replace(/ia/g, "ya");
  let l = "()?-[]x+’'°§⸢⸣*./";
  for (let c of l) {
    while (text.includes(c)) {
      text = text.replace(c, "");
    }
    return text;
  }
}

export default function Quiz(props) {
  let words = props.words;
  // shuffle words
  words.sort(() => Math.random() - 0.5);
  let [quizId, setQuizId] = useState(0);
  let [correctAlert, setCorrectAlert] = useState(<div></div>);
  let quiz = quizMaker(words[quizId]);

  function answerHandle(e) {
    setQuizId(quizId + 1);
    let userAnswer = document.getElementById("answer").value;
    // split userAnswer by "-" and "."
    let userAnswerArray = userAnswer.split(/[-.]/);
    let answer = normalize(words[quizId].word);
    let answerArray = answer.split(/[-.]/);
    let correct = true;
    if (userAnswerArray.length !== answerArray.length) {
      correct = false;
    } else {
      for (let i = 0; i < userAnswerArray.length; i++) {
        if (normalize(userAnswerArray[i]) !== answerArray[i]) {
          correct = false;
          break;
        }
      }
    }
    if (correct) {
      setCorrectAlert(<div>Correct!</div>);
    }
    if (!correct) {
      setCorrectAlert(
        <div>Incorrect!, correct answer was {words[quizId].word}</div>
      );
    }
  }

  return (
    <div>
      {quiz}
      <input type="text" id="answer" />
      <button onClick={answerHandle}>Check</button>
      {correctAlert}
    </div>
  );
}
