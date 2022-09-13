import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Lesson from "./components/Lesson";
import Signs from "./components/Signs";
import Sign from "./components/Sign";
import TroubledSign from "./components/TroubledSign";
import {
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
import "./myscripts/unicode.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { hpe } from "grommet-theme-hpe";

import Profile from "./components/Profile";
import React from "react";

function App() {
  return (
    <Auth0Provider
      domain="dev-e1k72f43.us.auth0.com"
      clientId="6lotGClh7WLTxrzAa75T8tlxcbnUl0MU"
      redirectUri={window.location.origin}
    >
      <Grommet full theme={hpe}>
        <Page>
          <PageContent>
            <Box fill>
              <Box flex overflow="auto" className="main">
                <BrowserRouter>
                  <Nav
                    align="center"
                    flex={false}
                    background={{ color: "brand" }}
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
                      <Profile />
                    </Box>
                  </Nav>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/lesson/:id" element={<Lesson />} />
                    <Route path="/Signs" element={<Signs />} />
                    <Route path="/Sign/:id" element={<Sign />} />
                    <Route path="/deneme" element={<TroubledSign />} />
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
    </Auth0Provider>
  );
}

export default App;
