import React from "react";
import HzlCuneiform from "./HzlCuneiform";
import { Box } from "grommet";

export default function Logo() {
  return (
    <Box background="brand" pad="xlarge" color="white" margin="large">
      <HzlCuneiform signs={[199, 99, 205]} />
    </Box>
  );
}
