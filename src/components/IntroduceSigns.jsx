import React from "react";
import db from "../myscripts/cuneiform.json";
import { HzlCuneiform } from "./HzlCuneiform";
import Grid from "@mui/material/Grid";
import { Card, Text, DataTable, Box, Tip, Carousel } from "grommet";
import { Link } from "react-router-dom";

function getTwoDecimalPlaces(number) {
  return Math.round(number * 10000) / 100;
}

function renderSign(hzl) {
  let values = db.__collections__.values;
  // values is a obj with key is id of value and value is object find value objects where value.hzl === hzl
  let valuesOfSign = Object.values(values).filter((value) => value.hzl === hzl);
  // for each value of sign ratio=getTwoDecimal(ratio*100)
  valuesOfSign = valuesOfSign.map((value) => {
    return { ...value, ratio: getTwoDecimalPlaces(value.ratio) };
  });
  return (
    <Grid item xs={12} md={12} lg={12}>
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
          <Link to={`/sign/${hzl}`} className="text-link">
            <Tip content="Click on sign for further details">
              <Text
                margin="small"
                textAlign="center"
                size="large"
                truncate={false}
              >
                <HzlCuneiform signs={[hzl]} />
              </Text>
            </Tip>
          </Link>
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
            background={[
              { color: "graph-1", opacity: "strong" },
              { color: "graph-1", opacity: "weak" },
            ]}
            sort={{ property: "ratio", direction: "desc" }}
            columns={[
              { property: "value", primary: true, header: "Value" },
              { property: "value_count", header: "Count" },
              { property: "ratio", header: "pct", units: "%" },
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
    <Box>
      <Text textAlign="center" size="medium" truncate={false}>
        Click on a sign to go to the value page where you can explore the values
        and their usage.
      </Text>
      <Grid container spacing={0}>
        <Carousel fill>{renderedSigns}</Carousel>
      </Grid>
    </Box>
  );
}
