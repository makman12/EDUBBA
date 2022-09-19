import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageContent, PageHeader, Text, Paragraph, Box } from "grommet";

export class Home extends Component {
  render() {
    return (
      <PageContent>
        <PageHeader
          title="Welcome to É.DUB.BA"
          subtitle="School of Hittite Cuneiform"
        />
        <Paragraph textAlign="left" fill>
          The term É.DUB.BA is Sumerian but also used by the Hittites. The
          literal meaning is <i>House of tablets</i>. Houses of tablets were
          schools where scribes learned to read and write cuneiform. The
          É.DUB.BA project is a digital version of a house of tablets. It is a
          place where you can learn to read Hittite cuneiform.
        </Paragraph>
        <Paragraph textAlign="left" fill>
          We analyzed the corpus of Hittite texts and created a corpus of
          complete words. These 60.000 lexeme (17.000 unique) were then used to
          understand how signs were used in Hittite cuneiform. Then aset of
          lessons based on this analysis were created. Each lesson contains 5
          signs.
        </Paragraph>
        <Paragraph textAlign="left" fill>
          Eventhough there 375 signs that are listed in
          <i>"Hethitisches Zeichenlexikon"</i>, some of them used rarely, and
          some of them are in every sentence. Teaching order of the signs
          determined in a way that every next signs you learn will allow you to
          read a bigger portion of the corpus. For example after Lesson 10 you
          will be able to read <b>37%</b> of the corpus. And after lesson 20 you
          will be able to read <b>80%</b> of the corpus!
        </Paragraph>
        <Paragraph textAlign="left" fill>
          Each lesson is cumulative. So you'll need to learn all the signs in
          previous lessons to be able to read the words in the current lesson.
        </Paragraph>
        <Box alignSelf="center">
          <Link to="/lesson/1">
            <Text size="large" color="brand">
              Start Learning!
            </Text>
          </Link>
        </Box>
      </PageContent>
    );
  }
}

export default Home;
