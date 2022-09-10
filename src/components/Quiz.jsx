import React from "react";
import { HzlCuneiform } from "./HzlCuneiform";
import { useState } from "react";
import {
  Grommet,
  Page,
  PageContent,
  Card,
  Text,
  TextInput,
  Button,
} from "grommet";
import { Grid } from "@mui/material";
// get props from parent component

function quizMaker(word) {
  let cuneiform = <HzlCuneiform signs={word.syllabic_hzl} />;
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
  let l = "()?[]x+’'°§⸢⸣*˹˺";
  for (let c of l) {
    while (text.includes(c)) {
      text = text.replace(c, "");
    }
  }
  return text;
}
let stroke = 0;

export default function Quiz(props) {
  let words = props.words;
  console.log("geld");
  // shuffle words
  //words.sort(() => Math.random() - 0.5);
  let [quizId, setQuizId] = useState(0);
  let [correctAlert, setCorrectAlert] = useState(<div></div>);
  let quiz = quizMaker(words[quizId]);

  function answerHandle(e) {
    let userAnswer = document.getElementById("answer").value;
    document.getElementById("answer").value = "";
    // split userAnswer by "-" and "." and "/"
    let userAnswerArray = userAnswer.split(/[-./]/);
    let answer = normalize(words[quizId].word);
    console.log(answer);
    let answerArray = answer.split(/[-./]/);
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
      stroke = 0;
      setQuizId(quizId + 1);
      setCorrectAlert(
        <Card
          background={{ color: "status-ok" }}
          pad="small"
          align="center"
          justify="center"
          direction="column"
          margin="none"
        >
          <Text color="light-1" textAlign="center">
            Correct!
          </Text>
        </Card>
      );
    }
    if (!correct) {
      let returnText = "";
      if (stroke === 0) {
        stroke = 1;
        returnText = "Wrong! Try again!";
      } else if (stroke === 1) {
        stroke = 2;
        returnText =
          "Wrong Again. The correct answer was: " +
          words[quizId].word +
          "\nPress Enter to Continue";
      } else if (stroke === 2) {
        stroke = 0;
        setQuizId(quizId + 1);
        setCorrectAlert(<div></div>);
        return true;
      }

      setCorrectAlert(
        <Card
          background={{ color: "status-error" }}
          pad="small"
          align="center"
          justify="center"
          direction="column"
          margin="none"
        >
          <Text color="light-1" textAlign="center">
            {returnText}
          </Text>
        </Card>
      );
    }
  }

  // when #card was in focus, press enter to answerHandle
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      answerHandle();
    }
  }

  return (
    <div>
      <Card
        id="card"
        pad="large"
        gap="medium"
        overflow="auto"
        flex
        margin="medium"
        background={{ color: "background-front", dark: false }}
        hoverIndicator={true}
        align="stretch"
        justify="start"
        direction="column"
        onKeyPress={handleKeyPress}
      >
        <Text margin="small" textAlign="center" size="large" truncate={false}>
          {quiz}
        </Text>
        <TextInput
          disabled={false}
          id="answer"
          textAlign="center"
          placeholder="Transliterate it!"
          reverse
        />
        <Button
          label="Check"
          primary
          type="button"
          color="brand"
          onClick={answerHandle}
        />
        {correctAlert}
      </Card>
    </div>
  );
}
