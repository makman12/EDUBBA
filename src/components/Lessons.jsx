import React from "react";
import { Link } from "react-router-dom";
import {
  Page,
  PageContent,
  PageHeader,
  Anchor,
  Box,
  Heading,
  Text,
} from "grommet";
import HzlCuneiform from "./HzlCuneiform";
import lessonsObject from "../myscripts/lessons.json";
import { MainContext, useContext } from "../context";
import { getDoc } from "firebase/firestore";

export default function Lessons() {
  const { userData } = useContext(MainContext);
  const [signData, setSignData] = React.useState({});
  React.useEffect(() => {
    async function getSignData() {
      if (!userData) return;
      let signs = userData.signs;
      const signDoc = await getDoc(signs);
      let newSignData = signDoc.data();
      console.log(newSignData, "signData");
      setSignData(newSignData);
    }
    getSignData();
  }, [userData]);

  const renderLessons = () => {
    let lessons = [];
    for (let i = 1; i <= 50; i++) {
      let lessonSigns = lessonsObject[i];
      let done = false;
      if (lessonSigns.every((sign) => signData[sign] >= 15)) {
        done = true;
      }
      let started = false;
      if (lessonSigns.some((sign) => signData[sign] > 0)) {
        started = true;
      }
      let progressComponent = <></>;
      if (started) {
        if (done) {
          progressComponent = (
            <Box background="status-ok" pad="small">
              <Text>Done</Text>
            </Box>
          );
        } else {
          progressComponent = (
            <Box background="status-warning" pad="small">
              <Text>Started</Text>
            </Box>
          );
        }
      }

      lessons.push(
        <Box key={i} alignSelf="center" gap="large" margin="large">
          <Link to={`/lesson/${i}`} key={i}>
            <Box direction="row">
              {progressComponent}
              <Text>
                {`⮞ Lesson ${i}`} <HzlCuneiform signs={lessonsObject[i]} />{" "}
              </Text>
            </Box>
          </Link>
        </Box>
      );
    }
    return lessons;
  };
  return (
    <>
      <PageHeader title="Lessons" subtitle="List of all lessons" />
      {renderLessons()}
    </>
  );
}
