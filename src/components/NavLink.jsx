import React from "react";
import { Box, Text } from "grommet";
import { Link } from "react-router-dom";

export default function NavLink({ label, to }) {
  return (
    <Box
      round
      pad={{ vertical: "small", horizontal: "medium" }}
      background={{ color: "light-3", opacity: "weak" }}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <Text label="Signs" color="white" gap="medium" size="medium">
          {label}
        </Text>
      </Link>
    </Box>
  );
}
