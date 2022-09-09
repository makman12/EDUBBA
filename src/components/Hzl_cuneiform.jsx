import React, { Component } from "react";
// import json data from '../myscripts/unicodedata.json' and store it in a variable
import unicodeData from "../myscripts/unicode.json";
import "../myscripts/unicode.css";

export class Hzl_cuneiform extends Component {
  write_cuneiform() {
    let cuneiform = "";
    for (let i of this.props.signs) {
      cuneiform += unicodeData[i - 1]["unicode"];
    }
    return cuneiform;
  }

  render() {
    return <span className="unicode">{this.write_cuneiform()}</span>;
  }
}

export default Hzl_cuneiform;
