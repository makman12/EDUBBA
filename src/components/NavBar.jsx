import React from "react";
import { Link } from "react-router-dom";
import { Box, Nav, Anchor, Text, Heading, Menu } from "grommet";
import { Menu as MenuIcon } from "grommet-icons";
import "../myscripts/unicode.css";
import Profile from "./Profile";
import { useMediaQuery } from "react-responsive";

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
          <Link to="/scoreboard">
            <Anchor label="Scribe Ranks" color="light-1" gap="medium" />
          </Link>
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
                <Box size="large" pad="large">
                  Signs
                </Box>
              ),
              href: "/signs",
            },
            {
              label: (
                <Box size="large" pad="large">
                  Lessons
                </Box>
              ),
              href: "/lessons",
            },
            {
              label: (
                <Box size="large" pad="large">
                  Scribe Ranks
                </Box>
              ),
              href: "/classroom",
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
