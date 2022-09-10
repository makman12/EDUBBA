import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Lesson from "./components/Lesson";
import Signs from "./components/Signs";
import Sign from "./components/Sign";
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
import "./myscripts/unicode.css";

function App() {
  return (
    <Grommet full theme={grommet}>
      <Page>
        <PageContent>
          <Box fill>
            <Box flex overflow="auto" className="main">
              <BrowserRouter>
                <Nav
                  align="center"
                  flex={false}
                  background={{ color: "graph-2" }}
                  justify="between"
                  direction="row"
                  pad="xsmall"
                  gap="small"
                  margin="none"
                >
                  <Link to="/">
                    <Heading level="3" textAlign="start" color="light-1">
                      <Text className="unicode" size="xlarge">
                        𒂍𒁾𒁀-
                      </Text>
                      É.DUB.BA
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
                    <Link to="/signs">
                      <Anchor label="Signs" color="light-1" gap="medium" />
                    </Link>
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
                  <Route path="/Signs" element={<Signs />} />
                  <Route path="/Sign/:id" element={<Sign />} />
                </Routes>
              </BrowserRouter>
            </Box>
            {/* footer always on bottom*/}
            <Footer background="brand" pad="medium" className="footer">
              <Text>M. Ali Akman</Text>
              <Anchor label="About" color="light-2" />
            </Footer>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
