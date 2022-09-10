import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Lesson from "./components/Lesson";
import {
  Main,
  Page,
  PageContent,
  Nav,
  Anchor,
  Box,
  Heading,
  Footer,
  Text,
  Grommet,
  grommet,
} from "grommet";
import { Login } from "grommet-icons";

function App() {
  return (
    <Grommet full theme={grommet}>
      <Page>
        <PageContent>
          <Box fill>
            <Box flex overflow="auto">
              <BrowserRouter>
                <Nav
                  align="center"
                  flex={false}
                  background={{ color: "graph-2" }}
                  justify="between"
                  direction="row"
                  pad="xsmall"
                  gap="large"
                  margin="none"
                >
                  <Link to="/">
                    <Heading level="2" textAlign="start" color="light-1">
                      É.DUB.BA: School of Hittite Cuneiform
                    </Heading>
                  </Link>
                  <Box
                    align="center"
                    justify="between"
                    pad="medium"
                    fill="vertical"
                    direction="row"
                    gap="medium"
                  >
                    <Link to="/lessons">
                      <Anchor label="Lessons" color="light-1" gap="medium" />
                    </Link>
                    <Anchor color="light-1" gap="medium" icon={<Login />} />
                  </Box>
                </Nav>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/lesson/:id" element={<Lesson />} />
                </Routes>
              </BrowserRouter>
            </Box>
            {/* footer always on bottom*/}
            <Footer background="brand" pad="medium" flex={false}>
              <Text>M. Ali Akman</Text>
              <Anchor label="About" />
            </Footer>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
