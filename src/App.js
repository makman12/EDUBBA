import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Logs from "./components/Logs";
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
import { useAuth0 } from "@auth0/auth0-react";
import myTheme from "./myTheme";

import Profile from "./components/Profile";
import React from "react";
import NavBar from "./components/NavBar";

// cutom theme

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isAuthenticated) {
    console.log("girildi", user.nickname);
  }
  return (
    <Auth0Provider
      domain="dev-e1k72f43.us.auth0.com"
      clientId="6lotGClh7WLTxrzAa75T8tlxcbnUl0MU"
      clientSecret="Zy8z981q1yhqclXsjE9acrH8f1sy1gjy03gCAfYU-JuwEQElff08zJfsiVFotlGa"
      redirectUri={window.location.origin}
    >
      <Grommet full theme={myTheme}>
        <Page>
          <BrowserRouter>
            <NavBar />
            <PageContent overflow="auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/Signs" element={<Signs />} />
                <Route path="/Sign/:id" element={<Sign />} />
                <Route path="/progress" element={<TroubledSign />} />
                <Route path="/logs" element={<Logs />} />
              </Routes>

              {/* footer always on bottom*/}
            </PageContent>
            <Box pad="large"></Box>
            <Footer background="brand" pad="medium" className="footer">
              <Anchor target="_blank" href="https://github.com/makman12">
                M. Ali Akman
              </Anchor>
              <Link to="/logs">
                <Anchor label="Whats's new?" color="light-2" />
              </Link>
            </Footer>
          </BrowserRouter>
        </Page>
      </Grommet>
    </Auth0Provider>
  );
}

export default App;
