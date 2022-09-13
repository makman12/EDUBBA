import React from "react";
import { HzlCuneiform } from "./HzlCuneiform";
import FindValueRender from "./FindValueRender";
import { Box, PageHeader, Text, PageContent, Page } from "grommet";
import { firestore } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function renderHzlConfused(wrongSigns, hzl) {
  let hzlConfused = wrongSigns[hzl];
  let hzlConfusedList = Object.keys(hzlConfused);
  let hzlConfusedRender = [];
  for (let value of hzlConfusedList) {
    hzlConfusedRender.push(
      <>
        <FindValueRender value={value} /> {wrongSigns[hzl][value]} times.
      </>
    );
  }
  return (
    <Box direction="row" gap="large" fill>
      <Text>You confused this sign </Text>
      <HzlCuneiform signs={[hzl]} />
      <Box direction="column" gap="large">
        with:{hzlConfusedRender}
      </Box>
    </Box>
  );
}

export default function TroubledSign() {
  const userCollection = collection(firestore, "userData");
  React.useEffect(() => {
    // get userData from firebase
    const getUserData = async () => {
      const data = await getDocs(userCollection);
      const userData = data.docs.map((doc) => doc.data());
      console.log(userData);
    };
    getUserData();
  }, []);
  // get local storage wrongSigns
  // wrongSigns is a object with key as hzl and value is a object with key as confusedValue and value as number of times confused

  let wrongSigns = JSON.parse(localStorage.getItem("wrongSigns"));
  let signs = Object.keys(wrongSigns);
  // remove undefined key
  signs = signs.filter((sign) => sign != "undefined");
  let components = signs.map((hzl) => renderHzlConfused(wrongSigns, hzl));
  return (
    <Page>
      <PageContent fill>
        <PageHeader
          title="Your Cuneiform Report"
          subtitle="See how much you've learned and what your mistakes are."
        />
        {components}
      </PageContent>
    </Page>
  );
}
