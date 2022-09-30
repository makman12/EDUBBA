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
import { useMediaQuery } from "react-responsive";

// add lesson for you if user is logged in and has at least 5 signs that they need to study

export default function Lessons() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { userData } = useContext(MainContext);
  const [signData, setSignData] = React.useState({});
  const [review, setReview] = React.useState(false);
  React.useEffect(() => {
    async function getSignData() {
      if (!userData) return;
      let signs = userData.signs;
      const signDoc = await getDoc(signs);
      let newSignData = signDoc.data();
      setSignData(newSignData);
      // get signs that are less than 10
      let signsToStudy = Object.keys(newSignData).filter(
        (key) => newSignData[key] < 10
      );
      // check if signsToStudy is at least 5
      if (signsToStudy.length >= 5) {
        setReview(true);
      }
    }
    getSignData();
  }, [userData]);

  const renderLessons = () => {
    let lessons = [];
    if (review) {
      lessons.push(
        <Box key={0} alignSelf="center" gap="large" margin="large">
          <Link to={`/review`} key={0}>
            <Box direction="row" justify="center">
              <Text>{`⮞ Review Signs`} </Text>
            </Box>
          </Link>
        </Box>
      );
    }
    for (let i = 1; i <= 50; i++) {
      let lessonSigns = lessonsObject[i];
      let done = false;
      if (lessonSigns.every((sign) => signData[sign] >= 10)) {
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
            <Box background="status-ok" pad="small" round>
              <Text>Done</Text>
            </Box>
          );
        } else {
          progressComponent = (
            <Box background="status-warning" pad="small" round>
              <Text>Started</Text>
            </Box>
          );
        }
      }

      lessons.push(
        <Box key={i} alignSelf="center" gap="large" margin="large">
          <Link to={`/lesson/${i}`} key={i}>
            <Box direction="row" justify="center">
              {progressComponent}
              <Text>
                {`⮞ Lesson ${i}`}{" "}
                {!isMobile ? <HzlCuneiform signs={lessonsObject[i]} /> : <></>}{" "}
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
