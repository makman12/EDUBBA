import React from "react";
import { HzlCuneiform } from "./HzlCuneiform";
import { useState } from "react";
import { Card, Text, TextInput, Button, Box, CheckBox } from "grommet";
import db from "../myscripts/cuneiform.json";
// get props from parent component

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

let values = db.__collections__.values;

function getHzlOfValue(value) {
  // loop through values  which is object each key is a object if value.value == value return value.hzl
  for (let key in values) {
    if (values[key].value == value) {
      return values[key].hzl;
    }
  }
}

function getValuesofHzl(hzl) {
  // get all values of hzl
  let values_of_hzls = [];
  for (let key in values) {
    if (values[key].hzl == hzl) {
      values_of_hzls.push(values[key].value);
    }
  }
  return values_of_hzls;
}

function otherValues(value) {
  // get all values of hzl
  let hzl = getHzlOfValue(value);
  return getValuesofHzl(hzl);
}

function createDummyWords(words) {
  let dummyWords = [...words];
  let syllableSet = new Set();
  for (let word of words) {
    for (let syllable of word.syllabic_hzl) {
      syllableSet.add(syllable);
    }
  } // create random 100 lists of 4 syllables to use as dummy
  for (let i = 0; i < 100; i++) {
    let dummy = [];
    for (let j = 0; j < 4; j++) {
      let syllables = Array.from(syllableSet);
      dummy.push(syllables[Math.floor(Math.random() * syllables.length)]);
    }
    dummyWords.push({ syllabic_hzl: dummy, word: "dummy" });
  }
  return dummyWords;
}

export default function Quiz(props) {
  const [onlyPhonetic, setOnlyPhonetic] = useState(false);
  const [useDummy, setUseDummy] = useState(false);
  let words = props.words;
  let dummyWords = createDummyWords(words);
  if (useDummy) {
    console.log("use dummy");
    words = dummyWords;
    console.log(words);
  } else {
    words = props.words;
  }
  // shuffle words
  //words.sort(() => Math.random() - 0.5);
  let [quizId, setQuizId] = useState(0);
  console.log("quizId", quizId);
  let [correctAlert, setCorrectAlert] = useState(<div></div>);
  function quizMaker(word) {
    // if word is undefined return
    if (word == undefined) {
      return <div>You answered all questions</div>;
    }
    // if word.lowercase is !== word quizId++
    if (onlyPhonetic) {
      if (word.word.toLowerCase() !== word.word) {
        setQuizId(quizId + 1);
      }
    }
    let cuneiform = <HzlCuneiform signs={word.syllabic_hzl} />;
    let question = <div>{cuneiform}</div>;
    return question;
  }
  let quiz = quizMaker(words[quizId]);
  function renderCorrectAlert(color, text) {
    let textComponent = text.map((t) => {
      return (
        <Box pad="xsmall">
          <Text color="light-1">{t}</Text>
        </Box>
      );
    });
    let render = (
      <Card
        background={{ color: color }}
        pad="small"
        align="center"
        justify="center"
        direction="column"
        margin="none"
      >
        <Text color="light-1" textAlign="center">
          {textComponent}
        </Text>
      </Card>
    );
    setCorrectAlert(render);
  }

  function compareAnswers(userAnswerArray, correctAnswerArray) {
    // compare two arrays if length is not equal return false
    let normalizedUserAnswerArray = userAnswerArray.map((value) =>
      normalize(value)
    );
    let normalizedCorrectAnswerArray = correctAnswerArray.map((value) =>
      normalize(value)
    );
    if (userAnswerArray.length != correctAnswerArray.length) {
      stroke++;
      renderCorrectAlert("status-critical", ["Try to guess every sign"]);
      return false;
    }
    // compare each element of normalizedUserAnswerArray with normalizedCorrectAnswerArray
    let warnings = [];
    for (let i = 0; i < normalizedUserAnswerArray.length; i++) {
      if (normalizedUserAnswerArray[i] != normalizedCorrectAnswerArray[i]) {
        let otherValuesOfCorrectAnswer = otherValues(correctAnswerArray[i]);
        let normalizedOtherValuesOfCorrectAnswer =
          otherValuesOfCorrectAnswer.map((value) => normalize(value));
        if (
          normalizedOtherValuesOfCorrectAnswer.includes(
            normalizedUserAnswerArray[i]
          )
        ) {
          let hzl = getHzlOfValue(correctAnswerArray[i]);
          console.log(hzl);
          warnings.push(
            <Text color="dark-1">
              {userAnswerArray[i]} is a value of '
              <Text size="xsmall">
                <HzlCuneiform signs={[hzl]} />
              </Text>
              ' but it is not the value here.
            </Text>
          );
        } else {
          // create localstorage to save wrong signs
          troubledSign(correctAnswerArray[i], userAnswerArray[i]);
          // end of localstorage

          stroke++;
          renderCorrectAlert("status-critical", ["Wrong! Try again!"]);
          return false;
        }
      }
    }
    if (warnings.length > 0) {
      renderCorrectAlert("status-warning", warnings);
      return false;
    } else {
      setQuizId(quizId + 1);
      stroke = 0;
      renderCorrectAlert("status-ok", ["Correct!"]);
      return true;
    }
  }

  function answerHandle(e) {
    let userAnswer = document.getElementById("answer").value;
    document.getElementById("answer").value = "";
    // split userAnswer by "-" and "." and "/"
    let userAnswerArray = userAnswer.split(/[-./]/);
    let correctAnswerArray = words[quizId].word.split(/[-./]/);
    compareAnswers(userAnswerArray, correctAnswerArray);
    if (stroke === 2) {
      renderCorrectAlert("status-critical", [
        "Wrong Answer! Correct Answer is: ",
        <b>{words[quizId].word}</b>,
        "\nPress Enter to Continue",
      ]);
    }
    if (stroke === 3) {
      setQuizId(quizId + 1);
      stroke = 0;
      setCorrectAlert(<div></div>);
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
        <Box
          align="start"
          justify="start"
          direction="row"
          gap="large"
          pad={{ top: "small", bottom: "large", left: "small", right: "small" }}
        >
          <CheckBox
            label="Only Phonetic values"
            id="onlyPhonetic"
            checked={onlyPhonetic}
            onChange={(event) => setOnlyPhonetic(event.target.checked)}
          />
          {/*
          <CheckBox
            label="Use Dummy lexemes"
            id="useDummy"
            checked={useDummy}
            onChange={(event) => setUseDummy(event.target.checked)}
          />
          */}
        </Box>
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

function troubledSign(value, confusedValue) {
  // if value or confusedValue is undefined return
  if (value == undefined || confusedValue == undefined) {
    return false;
  }
  let wrongSigns = JSON.parse(localStorage.getItem("wrongSigns"));
  if (wrongSigns == null) {
    wrongSigns = {};
  }
  let hzl = getHzlOfValue(value);
  if (wrongSigns[hzl] == null) {
    wrongSigns[hzl] = {};
    wrongSigns[hzl][confusedValue] = 1;
  } else {
    wrongSigns[hzl][confusedValue] += 1;
  }

  localStorage.setItem("wrongSigns", JSON.stringify(wrongSigns));
}
// create localstorage cookie
