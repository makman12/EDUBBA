import React from "react";
import { Box, PageHeader, Text } from "grommet";

const logs = [
  {
    date: "15.09.22",
    changes: [
      "Whats's new page at /logs",
      "fixed sign introduction stylistic issue",
      "Added menu nav to mobile view",
      "small details for better mobile view",
    ],
  },
];

function componentLog() {
  return logs.map((log, index) => {
    return (
      <Box key={index} gap="small">
        <Text size="large" weight="bold">
          ✓ {log.date}
        </Text>
        <Box gap="small" margin={{ left: "large" }}>
          {log.changes.map((change, index) => {
            return <Text key={index}>⮞ {change}</Text>;
          })}
        </Box>
      </Box>
    );
  });
}

export default function Logs() {
  return (
    <Box>
      <PageHeader
        title="Recent Changes"
        subtitle="List of new changes that you would like to try."
      />
      {componentLog()}
    </Box>
  );
}
