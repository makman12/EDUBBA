import React from "react";
import { Box, PageHeader, Text, Anchor } from "grommet";

export default function About() {
  return (
    <>
      <PageHeader title="About" subtitle="Learn about the project" />
      <Text>
        Project aims to be used as an educational tool for learning Hittite
        Cuneiform. All lexemes used are from online transliterations of{" "}
        <Anchor href="https://www.hethport.uni-wuerzburg.de/HPM/index.php">
          HPM
        </Anchor>
        .
      </Text>
    </>
  );
}
