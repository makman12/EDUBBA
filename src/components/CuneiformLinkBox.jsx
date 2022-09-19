import React from "react";
import { Box } from "grommet";
import { Link } from "react-router-dom";
import HzlCuneiform from "./HzlCuneiform";

export default function CuneiformLinkBox(props) {
  let hzl = props.hzl;

  return (
    <Link to={`/sign/${hzl}`}>
      <Box pad="small">
        <HzlCuneiform signs={[hzl]} />
      </Box>
    </Link>
  );
}
