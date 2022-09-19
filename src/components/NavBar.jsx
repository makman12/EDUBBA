import React from "react";
import { Link } from "react-router-dom";
import { Box, Nav, Anchor, Text, Heading, Menu } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import "../myscripts/unicode.css";
import Profile from "./Profile";
import { useMediaQuery } from "react-responsive";
import NavLink from "./NavLink";

export default function NavBar() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (!isMobile) {
    return (
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
          <Heading level="3" textAlign="start" color="light-1" margin="medium">
            <Text className="unicode" size="xlarge">
              𒂍𒁾𒁀-
            </Text>
            É.DUB.BA
          </Heading>
        </Link>

        <Box
          align="center"
          justify="between"
          pad={{ vertical: "small", horizontal: "large" }}
          round
          fill="vertical"
          direction="row"
          gap="small"
          background={{ color: "dark-1", opacity: "medium" }}
        >
          <NavLink label="Signs" to="/signs" />
          <NavLink label="Lessons" to="/lessons" />
          <NavLink label="Ranking" to="/scoreboard" />
          <NavLink label="Battle!" to="/battle" />
          <Profile />
        </Box>
      </Nav>
    );
  } else {
    return (
      <Nav
        align="center"
        flex={false}
        background={{ color: "brand" }}
        justify="between"
        direction="row"
        pad="small"
        gap="small"
        margin="none"
      >
        <Menu
          icon={<MenuIcon color="light-1" size="large" />}
          size="large"
          label=""
          dropProps={{ margin: "none", pad: "none", size: "large" }}
          dropBackground={{ color: "brand", opacity: "medium" }}
          items={[
            {
              label: (
                <Link to="/signs" style={{ textDecoration: "none" }}>
                  <Box size="large" pad="large">
                    Signs
                  </Box>
                </Link>
              ),
            },
            {
              label: (
                <Link to="/lessons" style={{ textDecoration: "none" }}>
                  <Box size="large" pad="large">
                    Lessons
                  </Box>
                </Link>
              ),
            },
            {
              label: (
                <Link to="/scoreboard" style={{ textDecoration: "none" }}>
                  <Box size="large" pad="large">
                    Scribe Ranks
                  </Box>
                </Link>
              ),
            },
            {
              label: (
                <Link to="/battle" style={{ textDecoration: "none" }}>
                  <Box size="large" pad="large">
                    Battle
                  </Box>
                </Link>
              ),
            },
          ]}
        />
        <Link to="/">
          <Heading level="4" textAlign="center" color="light-1">
            <Text className="unicode" size="xxlarge">
              𒂍𒁾𒁀
            </Text>
          </Heading>
        </Link>
        <Profile />
      </Nav>
    );
  }
}
