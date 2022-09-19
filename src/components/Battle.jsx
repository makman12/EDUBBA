import React from "react";
import CreateBattleRoom from "./CreateBattleRoom";
import JoinBattleRoom from "./JoinBattleRoom";
import { Box, Page, PageHeader, Button } from "grommet";

export default function Battle() {
  const [roomBox, setRoomBox] = React.useState(<></>);
  const buttonBox = React.useRef();

  function handleJoinBattleRoom() {
    console.log("Join Battle Room");
    buttonBox.current.style.display = "none";
    setRoomBox(<JoinBattleRoom />);
  }
  function handleCreateBattleRoom() {
    console.log("Create Battle Room");
    buttonBox.current.style.display = "none";
    setRoomBox(<CreateBattleRoom />);
  }
  return (
    <>
      <PageHeader
        title="Zahhai!!!"
        subtitle="Battle against your firends and see who is the best scribe."
      />
      <Box ref={buttonBox} gap="large">
        <Button
          primary
          label="Create Battle Room"
          size="large"
          onClick={handleCreateBattleRoom}
        />

        <Button
          primary
          label="Join Battle Room"
          size="large"
          onClick={handleJoinBattleRoom}
        />
      </Box>
      {roomBox}
    </>
  );
}
