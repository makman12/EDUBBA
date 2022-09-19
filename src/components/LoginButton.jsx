import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Anchor, Box, Text } from "grommet";
import { Login } from "grommet-icons";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      round
      pad="small"
      background={{ color: "dark-1", opacity: "medium" }}
      onClick={loginWithRedirect}
    >
      <Text color="white" gap="medium" size="large">
        Login / Register
      </Text>
    </Box>
  );
};

export default LoginButton;
