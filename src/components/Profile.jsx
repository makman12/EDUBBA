import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import { Anchor, Tip } from "grommet";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (isAuthenticated) {
    return (
      isAuthenticated && (
        <div>
          <Tip content="Click to logout">
            <Anchor
              label={user.name}
              color="light-1"
              onClick={() => logout({ returnTo: window.location.origin })}
            />
          </Tip>
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
};

export default Profile;
