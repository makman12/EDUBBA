import React from "react";
import { Box, PageHeader, Text } from "grommet";

const logs = [
  {
    date: "29.09.22",
    changes: [
      "About page added at /about",
      "Review signs added at /review",
      "Fixed some words that contains funny characters",
      "Changed lessons for few signs",
      "Fixed the issue with warnings won't go away",
      "Style changes in footer",
    ],
  },
  {
    date: "19.09.22",
    changes: [
      "Navbar Changed",
      "Battle mode has been added",
      "I hope battle mode won't be buggy and crash the app :)",
    ],
  },
  {
    date: "17.09.22",
    changes: [
      "Everyone gets a real Hittite name ! At first I thought users might change it later to whatever they want, but I changed my mind. Get use to your Hittite name.",
    ],
  },
  {
    date: "16.09.22",
    changes: [
      "Scribe Rank page at /scoreboard",
      "Created a scoring system for users",
      "Don't forget to learn from your mistakes at /progress",
      "See your sign progress at /progress",
      "Lessons page updated",
      "Sign pages updated",
    ],
  },
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
        <Box gap="small" margin={{ left: "large", bottom: "medium" }}>
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
        subtitle="List of recent changes that you would like to try."
      />
      {componentLog()}
    </Box>
  );
}
