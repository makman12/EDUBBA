import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Anchor, Tip } from "grommet";
import { Login } from "grommet-icons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Anchor
      color="light-1"
      gap="medium"
      label="Login / Signup"
      onClick={() => loginWithRedirect()}
    />
  );
};

export default LoginButton;
