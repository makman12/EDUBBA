import React from "react";
import { useParams } from "react-router-dom";
import db from "../myscripts/cuneiform.json";
import "../myscripts/unicode.css";
import {
  Box,
  Page,
  PageContent,
  Main,
  Heading,
  Text,
  Card,
  DataTable,
} from "grommet";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { HzlCuneiform } from "./HzlCuneiform";
import { render } from "@testing-library/react";

let signs = db.__collections__.signs;

function getTwoDecimalPlaces(number) {
  return Math.round(number * 10000) / 100;
}

function getMostFrequent(obj, col) {
  // obj is array of objects that have same keys
  // return the most frequent value of col
  let counts = {};
  for (let i = 0; i < obj.length; i++) {
    let num = obj[i][col];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }
  let sortable = [];
  for (let key in counts) {
    sortable.push([key, counts[key]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sortable[0][0];
}

export default function Sign() {
  let signId = useParams().id;
  let [stats, setStats] = React.useState(
    <Text>Click on Values for Statistics</Text>
  );
  function renderValueStats(e) {
    let words = db.__collections__.words;
    let value = e.datum.value;
    // word.syllabic is an array of syllables find words where syllabic contains value
    let wordsWithSyllable = Object.values(words).filter((word) =>
      word.syllabic.includes(value)
    );
    let statDiv = <div></div>;
    if (wordsWithSyllable.length > 0) {
      // get first 100 words
      wordsWithSyllable = wordsWithSyllable.slice(0, 200);
      let wordStats = wordsWithSyllable.map((word) => {
        let wordSyllables = word.syllabic;
        let wordSyllableCount = wordSyllables.length;
        let wordSyllableIndex = wordSyllables.indexOf(value);
        let wordSyllablePrevious = wordSyllables[wordSyllableIndex - 1];
        let wordSyllableNext = wordSyllables[wordSyllableIndex + 1];
        return {
          word: word.word,
          syllableCount: wordSyllableCount,
          syllablePrevious: wordSyllablePrevious,
          syllableNext: wordSyllableNext,
        };
      });
      // get most frequent wordSyllablePrevious
      statDiv = (
        <Card
          pad="medium"
          gap="medium"
          overflow="auto"
          flex
          margin="small"
          background={{ color: "background-front", dark: false }}
          hoverIndicator={false}
          align="stretch"
          justify="start"
          direction="column"
        >
          <Card
            pad="small"
            align="center"
            justify="center"
            direction="column"
            margin="none"
          >
            <Heading level="3" margin="none" alignSelf="center">
              Words that use value {value}
            </Heading>
            <DataTable
              fill
              background={{
                header: "dark-2",
                body: ["white", "light-2"],
                footer: { dark: "light-2", light: "dark-3" },
              }}
              columns={[
                { property: "word", primary: true, header: "Word" },
                { property: "syllableCount", header: "Syllables" },
                { property: "syllablePrevious", header: "Previous Syl." },
                { property: "syllableNext", header: "Following Syl." },
              ]}
              data={wordStats}
              sort={{ property: "syllablePrevious", direction: "desc" }}
              sortable
              paginate={{
                step: 30,
              }}
            />
          </Card>
        </Card>
      );
      setStats(statDiv);
    }
  }
  function renderSign(hzl) {
    let values = db.__collections__.values;
    // values is a obj with key is id of value and value is object find value objects where value.hzl === hzl
    let valuesOfSign = Object.values(values).filter(
      (value) => value.hzl == hzl
    );
    // for each value of sign ratio=getTwoDecimal(ratio*100)
    valuesOfSign = valuesOfSign.map((value) => {
      return { ...value, ratio: getTwoDecimalPlaces(value.ratio) };
    });

    return (
      <Grid item xs={12} md={6} lg={4}>
        <Card
          pad="medium"
          gap="medium"
          overflow="auto"
          flex
          margin="small"
          background={{ color: "background-front", dark: false }}
          hoverIndicator={false}
          align="stretch"
          justify="start"
          direction="column"
        >
          <Box pad="medium">
            <Text
              margin="small"
              textAlign="center"
              size="large"
              truncate={false}
            >
              <HzlCuneiform signs={[hzl]} />
            </Text>
          </Box>
          <Card
            pad="small"
            align="center"
            justify="center"
            direction="column"
            margin="none"
          >
            <DataTable
              sortable
              sort={{ property: "ratio", direction: "desc" }}
              background={{
                header: "light-2",
                body: [
                  { color: "control", opacity: "medium" },
                  { color: "control", opacity: "strong" },
                ],
                footer: { dark: "light-2", light: "dark-3" },
              }}
              columns={[
                { property: "value", primary: true, header: "Value" },
                { property: "value_count", header: "Count" },
                { property: "ratio", header: "pct", units: "%" },
              ]}
              onClickRow={renderValueStats}
              data={valuesOfSign}
              size="medium"
            />
          </Card>
        </Card>
      </Grid>
    );
  }

  // values is an object, which keys are id of of object
  // find values where value.hzl == sign.id
  return (
    <Main>
      <Page>
        <PageContent>
          <Box pad="large" alignSelf="center">
            <Heading>{"HZL : " + signId}</Heading>

            {renderSign(signId)}
          </Box>
          <Box pad="large">{stats}</Box>
        </PageContent>
      </Page>
    </Main>
  );
}
