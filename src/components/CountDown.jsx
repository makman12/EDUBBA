import React, { useEffect, useRef, useState } from "react";
import {
  Anchor,
  Box,
  Grommet,
  grommet,
  Heading,
  Meter,
  Paragraph,
  Stack,
  Text,
} from "grommet";

export default function CountDown({ timeLimit, questionTimeOut }) {
  const METER_TICK_RATE = 1; // 1 per second
  const MAX_METER = timeLimit; // max value (seconds)
  const GRAPH_MULTIPLIER = 20; // ticks per cycle
  const MAX_GRAPH = MAX_METER * GRAPH_MULTIPLIER; // max ticks for graphic per cycle

  const INIT_METER = MAX_METER;
  const INIT_GRAPH = MAX_GRAPH;
  const [meterValue, setMeterValue] = useState(INIT_METER);
  const [graphValue, setGraphValue] = useState(INIT_GRAPH);
  const [color, setColor] = useState("status-ok");

  const labelIntervalId = useRef();
  const graphIntervalId = useRef();

  useEffect(() => {
    labelIntervalId.current = setInterval(() => {
      setMeterValue((prev) => prev - 1);
    }, 1000 / METER_TICK_RATE);

    graphIntervalId.current = setInterval(() => {
      setGraphValue((prev) => prev - 1);
    }, 1000 / METER_TICK_RATE / GRAPH_MULTIPLIER);

    return () => {
      clearInterval(labelIntervalId.current);
      clearInterval(graphIntervalId.current);
    };
  }, []);

  useEffect(() => {
    // if (meterValue === 0) clearInterval(id.current);
    if (meterValue < 0) {
      setColor("status-ok");
      setMeterValue(INIT_METER + 1);
      setGraphValue(INIT_GRAPH + 1);
      questionTimeOut();
    } else if (meterValue <= 3) setColor("status-critical");
    else if (meterValue <= 5) setColor("status-warning");
  }, [meterValue]);

  return (
    <Box align="center" pad="large">
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          values={[{ value: (graphValue * 100) / MAX_GRAPH, color }]}
          // values={[{ value: (meterValue * 100) / MAX_METER, color }]}
          size="small"
          thickness="small"
        />
        <Box
          direction="row"
          align="center"
          gap="xxsmall"
          pad={{ bottom: "xsmall" }}
        >
          <Text size="xxlarge" weight="bold">
            {meterValue}
          </Text>
          <Text size="small">s</Text>
        </Box>
      </Stack>
    </Box>
  );
}
