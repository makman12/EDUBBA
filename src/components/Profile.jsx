import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Anchor, Box, Menu } from "grommet";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (localStorage.getItem("nickname") === null) {
    if (isAuthenticated) {
      // write user.nickname to localStorage
      localStorage.setItem("nickname", user.nickname);
      return (
        isAuthenticated && (
          <div>
            <Menu
              items={[
                {
                  label: "Logout",
                  onClick: () => {
                    localStorage.removeItem("nickname");
                    logout({ returnTo: window.location.origin });
                  },
                },
                {
                  label: "Progress",
                  href: "/progress",
                },
              ]}
              children={<Anchor label={user.nickname} color="light-1" />}
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
    let localuser = localStorage.getItem("nickname");
    return (
      <div>
        <Menu
          items={[
            {
              label: (
                <Box pad="medium" size="large">
                  Progress
                </Box>
              ),
              href: "/progress",
            },
            {
              label: (
                <Box pad="medium" size="large">
                  Logout
                </Box>
              ),
              onClick: () => {
                localStorage.removeItem("nickname");
                logout({ returnTo: window.location.origin });
              },
            },
          ]}
          children={<Anchor label={localuser} color="light-1" />}
        />
      </div>
    );
  }
};

export default Profile;
