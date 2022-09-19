import db from "./cuneiform.json";

let values = db.__collections__.values;
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

function compareAnswers(userAnswer, correctAnswer, allowWarning = false) {
  // split userAnswer and correctAnswer into array of words splited by "-" and "." and "/" and " "
  let userAnswerArray = userAnswer.split(/[-./ ]/);
  let correctAnswerArray = correctAnswer.split(/[-./ ]/);
  // compare two arrays if length is not equal return false
  let normalizedUserAnswerArray = userAnswerArray.map((value) =>
    normalize(value)
  );
  let normalizedCorrectAnswerArray = correctAnswerArray.map((value) =>
    normalize(value)
  );
  if (userAnswerArray.length != correctAnswerArray.length) {
    return false;
  }
  // compare each element of normalizedUserAnswerArray with normalizedCorrectAnswerArray
  let warnings = [];

  for (let i = 0; i < normalizedUserAnswerArray.length; i++) {
    if (normalizedUserAnswerArray[i] != normalizedCorrectAnswerArray[i]) {
      let otherValuesOfCorrectAnswer = otherValues(correctAnswerArray[i]);
      let normalizedOtherValuesOfCorrectAnswer = otherValuesOfCorrectAnswer.map(
        (value) => normalize(value)
      );
      if (
        normalizedOtherValuesOfCorrectAnswer.includes(
          normalizedUserAnswerArray[i]
        )
      ) {
        warnings.push(0);
      } else {
        return false;
      }
    }
  }
  if (warnings.length > 0) {
    return allowWarning;
  } else {
    return true;
  }
}

export { compareAnswers };
