import React from "react";
import db from "../myscripts/cuneiform.json";
import { Link } from "react-router-dom";
import HzlCuneiform from "./HzlCuneiform";
import { Box } from "grommet";

export default function FindValueRender(props) {
  let value = props.value;
  return <div>{findValueRender(value)}</div>;
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

function findValueRender(value) {
  value = normalize(value);
  let values = db.__collections__.values;
  let results = [];
  for (let key in values) {
    if (normalize(values[key].value) === value) {
      results.push({ hzl: values[key].hzl, value: values[key].value });
    }
  }
  // make a list of hzl from results
  let hzlList = [];
  for (let i = 0; i < results.length; i++) {
    hzlList.push(results[i].hzl);
  }
  // remove duplicates from hzlList
  hzlList = [...new Set(hzlList)];
  let finds = [];
  if (hzlList.length > 0) {
    for (let result of hzlList) {
      finds.push(
        <div>
          <Link to={`/sign/${result}`}>
            <HzlCuneiform signs={[result]} />
          </Link>
        </div>
      );
    }
    return (
      <Box direction="row" margin="large" gap="large">
        {finds}
      </Box>
    );
  } else {
    return <div>{value}</div>;
  }
}
