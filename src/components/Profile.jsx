import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Anchor, Box, Menu } from "grommet";
import { MainContext, useContext } from "../context";
import { getUser } from "../fireBaseUser";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  const { userData, setUserData } = useContext(MainContext);
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (localStorage.getItem("usersub") === null) {
    if (isAuthenticated) {
      localStorage.setItem("usersub", user.sub);
      getUser(user.sub, user.email).then((data) => {
        setUserData(data);
        localStorage.setItem("username", data.username);
      });
      let localUsername = localStorage.getItem("username");
      return (
        isAuthenticated && (
          <div>
            <Menu
              items={[
                {
                  label: "Logout",
                  onClick: () => {
                    localStorage.removeItem("usersub");
                    logout({ returnTo: window.location.origin });
                  },
                },
                {
                  label: "Progress",
                  href: "/progress",
                },
              ]}
              children={<Anchor label={localUsername} color="light-1" />}
            />
          </div>
        )
      );
    } else {
      return (
        <div>
          <LoginButton />
        </div>
      );
    }
  } else {
    let localUsername = localStorage.getItem("username");
    return (
      <div>
        <Menu
          items={[
            {
              label: (
                <Link to="/progress" style={{ textDecoration: "none" }}>
                  <Box pad="medium" size="large">
                    Progress
                  </Box>
                </Link>
              ),
            },
            {
              label: (
                <Box pad="medium" size="large">
                  Logout
                </Box>
              ),
              onClick: () => {
                localStorage.removeItem("usersub");
                logout({ returnTo: window.location.origin });
              },
            },
          ]}
          children={<Anchor label={localUsername} color="light-1" />}
        />
      </div>
    );
  }
};

export default Profile;
