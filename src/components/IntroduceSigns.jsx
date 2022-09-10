import React from "react";
import db from "../myscripts/cuneiform.json";
import Hzl_cuneiform, { HzlCuneiform } from "./HzlCuneiform";
import Grid from "@mui/material/Grid";
import {
  Grommet,
  Page,
  PageContent,
  Card,
  Text,
  TextInput,
  Button,
  DataTable,
  Main,
} from "grommet";

function renderValue(value) {
  return (
    <div>
      <span>{value.value}</span>
      <span>{value.ratio * 100}%</span>
    </div>
  );
}

function getTwoDecimalPlaces(number) {
  return Math.round(number * 10000) / 100;
}

function renderSign(hzl) {
  let signs = db.__collections__.signs;
  let values = db.__collections__.values;
  // values is a obj with key is id of value and value is object find value objects where value.hzl === hzl
  let valuesOfSign = Object.values(values).filter((value) => value.hzl === hzl);
  // for each value of sign ratio=getTwoDecimal(ratio*100)
  valuesOfSign = valuesOfSign.map((value) => {
    return { ...value, ratio: getTwoDecimalPlaces(value.ratio) };
  });
  console.log(valuesOfSign);
  let renderedValues = valuesOfSign.map((value) => renderValue(value));
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
        <Text margin="small" textAlign="center" size="large" truncate={false}>
          <HzlCuneiform signs={[hzl]} />
        </Text>
        <Card
          background={{ color: "graph-3" }}
          pad="small"
          align="center"
          justify="center"
          direction="column"
          margin="none"
        >
          <DataTable
            columns={[
              { property: "value", primary: true, header: "Value" },
              { property: "ratio", header: "Percentage", units: "%" },
              { property: "value_count", header: "Count" },
            ]}
            data={valuesOfSign}
            size="medium"
          />
        </Card>
      </Card>
    </Grid>
  );
}

export default function IntroduceSigns(props) {
  let signs = props.signs;
  let renderedSigns = signs.map((hzl) => renderSign(hzl));
  return (
    <Grid container spacing={0}>
      {renderedSigns}
    </Grid>
  );
}
