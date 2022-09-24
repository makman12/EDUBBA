import React from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import { Box } from "grommet";
import db from "../myscripts/cuneiform.json";
import HzlCuneiform from "./HzlCuneiform";

const values = db.__collections__.values;

export default function SignFlashCards({ signs }) {
  const cards = [];
  for (let i = 0; i < signs.length; i++) {
    let hzl = signs[i];
    let valuesOfSign = Object.values(values).filter(
      (value) => value.hzl === hzl
    );
    // for each value of sign get value.value and merge with coma
    let valuesOfSignString = valuesOfSign
      .map((value) => value.value)
      .join(", ");
    cards.push({
      front: "",
      frontChild: <HzlCuneiform signs={[hzl]} />,
      back: valuesOfSignString,
    });
  }
  console.log(cards);

  return (
    <Box align="center" margin="small">
      <FlashcardArray cards={cards} />
    </Box>
  );
}
