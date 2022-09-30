import React, { Component } from "react";
// import json data from '../myscripts/unicodedata.json' and store it in a variable
import unicodeData from "../myscripts/unicode.json";
import "../myscripts/unicode.css";
import { useMediaQuery } from "react-responsive";

export default function HzlCuneiform(props) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  function write_cuneiform() {
    let cuneiform = "";
    for (let i of props.signs) {
      cuneiform += unicodeData[+i - 1]["unicode"];
    }
    return cuneiform;
  }
  function calculateFontSize() {
    let fontSize = 0;
    if (props.signs.length <= 3) {
      fontSize = 100;
    } else if (props.signs.length <= 5) {
      fontSize = 70;
    } else if (props.signs.length <= 7) {
      fontSize = 60;
    } else if (props.signs.length <= 9) {
      fontSize = 50;
    } else if (props.signs.length <= 11) {
      fontSize = 40;
    } else {
      fontSize = 30;
    }
    let fontStyle = {};

    if (props.small) {
      fontSize = fontSize / 2;
    }

    if (isMobile) {
      fontStyle = { fontSize: fontSize * 0.08 + "vh" };
    } else {
      if (props.size) {
        fontStyle = { fontSize: props.size + "px" };
      } else {
        fontStyle = { fontSize: 6 + "vh" };
      }
    }
    return fontStyle;
  }

  return (
    <span className="unicode" style={calculateFontSize()}>
      {write_cuneiform()}
    </span>
  );
}
