import React from "react";
import db from "../myscripts/cuneiform.json";
import Hzl_cuneiform from "./Hzl_cuneiform";

function renderValue(value) {
  return (
    <div>
      <span>{value.value}</span>
      <span>{value.ratio * 100}%</span>
    </div>
  );
}

function renderSign(hzl) {
  let signs = db.__collections__.signs;
  let values = db.__collections__.values;
  // values is a obj with key is id of value and value is object find value objects where value.hzl === hzl
  let valuesOfSign = Object.values(values).filter((value) => value.hzl === hzl);
  let renderedValues = valuesOfSign.map((value) => renderValue(value));
  return (
    <div>
      <Hzl_cuneiform signs={[hzl]} />
      {renderedValues}
    </div>
  );
}

export default function IntroduceSigns(props) {
  let signs = props.signs;
  let renderedSigns = signs.map((hzl) => renderSign(hzl));
  return <div>{renderedSigns}</div>;
}
