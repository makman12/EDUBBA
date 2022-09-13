import React from "react";
import HzlCuneiform from "./HzlCuneiform";
import { Box } from "grommet";
import { useState } from "react";

export default function CuneiformChoice(props) {
  let signs = props.signs;
  let syllabicHzl = props.syllabicHzl;
  const [syllableIndex, setsyllableIndex] = useState(0);
  let correctSign = syllabicHzl[syllableIndex];
  let choices = [];
  for (let i = 0; i < 4; i++) {
    let sign = signs[Math.floor(Math.random() * signs.length)];
    choices.push(sign);
  }
  choices.push(correctSign);
  choices.sort(() => Math.random() - 0.5);
  function handleClick(e) {
    e.preventDefault();
    setsyllableIndex(syllableIndex + 1);
  }
  choices = choices.map((sign) => {
    return (
      <Box id={sign} onClick={handleClick}>
        <HzlCuneiform signs={[sign]} />
      </Box>
    );
  });
  return <Box direction="row">{choices}</Box>;
}
