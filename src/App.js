import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import Lessons from "./components/Lessons";
import Logs from "./components/Logs";
import Lesson from "./components/Lesson";
import Signs from "./components/Signs";
import Sign from "./components/Sign";
import Classroom from "./components/Classroom";
import Progress from "./components/Progress";
import { Page, PageContent, Anchor, Box, Footer, Grommet } from "grommet";
import "./myscripts/unicode.css";
import { Auth0Provider } from "@auth0/auth0-react";
import myTheme from "./myTheme";

import React from "react";
import NavBar from "./components/NavBar";
import { getUser } from "./fireBaseUser";
import { MainContext } from "./context";
import ScoreBoard from "./components/ScoreBoard";
import Logo from "./components/Logo";
// cutom theme

function App() {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    getUser().then((user) => {
      if (user) {
        setUserData(user);
      }
    });
  }, []);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <Auth0Provider
      domain="dev-e1k72f43.us.auth0.com"
      clientId="6lotGClh7WLTxrzAa75T8tlxcbnUl0MU"
      clientSecret="Zy8z981q1yhqclXsjE9acrH8f1sy1gjy03gCAfYU-JuwEQElff08zJfsiVFotlGa"
      redirectUri={window.location.origin}
    >
      <MainContext.Provider value={contextValue}>
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
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/classroom" element={<Classroom />} />
                  <Route path="/scoreboard" element={<ScoreBoard />} />
                  <Route path="/logo" element={<Logo />} />
                  <Route path="*" element={<Home />} />
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
      </MainContext.Provider>
    </Auth0Provider>
  );
}

export default App;
