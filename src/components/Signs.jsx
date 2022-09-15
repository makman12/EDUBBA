import React from "react";
import {
  Page,
  PageContent,
  PageHeader,
  Anchor,
  Box,
  Heading,
  TextInput,
  Button,
} from "grommet";

import db from "../myscripts/cuneiform.json";
import HzlCuneiform from "./HzlCuneiform";
import { Link } from "react-router-dom";

function goToHZL(e) {
  e.preventDefault();
  let hzl = document.getElementById("hzl").value;
  if (+hzl > 0 && +hzl < 376) {
    window.location.href = `/sign/${hzl}`;
  } else {
    alert("Please enter a number between 1 and 375");
  }
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

let finds = [];

export default function Signs() {
  const [find, setFind] = React.useState("");

  // while #hzl in focus and enter is pressed goToHzl
  function hzlKeyDown(e) {
    if (e.key === "Enter") {
      goToHZL(e);
    }
  }
  // while #value in focus and enter is pressed findValueRender
  function valueKeyDown(e) {
    if (e.key === "Enter") {
      findValueRender(e);
    }
  }

  function findValueRender(e) {
    console.log("findValueRender");
    e.preventDefault();
    let value = document.getElementById("value").value;
    value = normalize(value);
    let values = db.__collections__.values;
    let results = [];
    for (let key in values) {
      if (normalize(values[key].value) === value) {
        results.push({ hzl: values[key].hzl, value: values[key].value });
      }
    }
    console.log("loop over");
    setFind([]);
    let finds = [];
    if (results.length > 0) {
      for (let result of results) {
        finds.push(
          <div>
            <Link to={`/sign/${result.hzl}`}>
              <HzlCuneiform signs={[result.hzl]} />
              {result.value}
            </Link>
          </div>
        );
      }
      setFind(finds);
    } else {
      alert("Please enter a valid value");
    }
  }
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="Signs"
          subtitle="Find signs by HZL or by their values"
        />
        <Box alignSelf="start" gap="large" fill pad="large" direction="row">
          <TextInput
            placeholder="Enter HZL number"
            type="number"
            id="hzl"
            onKeyDown={hzlKeyDown}
          />
          <Button primary label="Go" onClick={goToHZL} />
        </Box>
        <Box alignSelf="start" gap="large" fill pad="large" direction="row">
          <TextInput
            placeholder="Enter value of a sign"
            id="value"
            type="text"
            onKeyDown={valueKeyDown}
          />
          <Button primary label="Find" onClick={findValueRender} />
        </Box>
        <Box alignSelf="start" gap="large" fill pad="large" direction="row">
          {find}
        </Box>
      </PageContent>
    </Page>
  );
}
