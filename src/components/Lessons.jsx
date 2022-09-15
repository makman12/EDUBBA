import React from "react";
import { Link } from "react-router-dom";
import { Page, PageContent, PageHeader, Anchor, Box, Heading } from "grommet";

export default function Lessons() {
  const renderLessons = () => {
    let lessons = [];
    for (let i = 1; i <= 58; i++) {
      lessons.push(
        <Box alignSelf="center" gap="large">
          <Link to={`/lesson/${i}`} key={i}>
            <Heading level={4}> {`⮞ Lesson ${i}`} </Heading>
          </Link>
        </Box>
      );
    }
    return lessons;
  };
  return (
    <div>
      <PageContent flex gap="medium">
        <PageHeader title="Lessons" subtitle="List of all lessons" />
        {renderLessons()}
      </PageContent>
    </div>
  );
}
