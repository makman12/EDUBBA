import React from "react";
import { firestore } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { PageHeader, Box, DataTable } from "grommet";
import { MainContext, useContext } from "../context";

export default function ScoreBoard() {
  const { userData, setUserData } = useContext(MainContext);
  const [usersData, setUsersData] = React.useState([]);
  const [rowProps, setRowProps] = React.useState({});
  React.useEffect(() => {
    async function getUsers() {
      const usersRef = collection(firestore, "userData");
      const usersSnapshot = await getDocs(usersRef);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      // sort users by score and add an index
      usersList.sort((a, b) => b.score - a.score);
      usersList.forEach((user, index) => {
        user.index = index + 1;
      });
      setUsersData(usersList);
    }
    getUsers();
    if (userData) {
      let newrowProps = {};
      newrowProps[userData.username] = { background: "graph-3", pad: "small" };
      setRowProps(newrowProps);
    }
  }, [userData]);
  return (
    <>
      <PageHeader title="Scribe Ranks" />
      <Box pad="medium" gap="medium">
        <DataTable
          sort={{ property: "score", direction: "desc" }}
          rowProps={{ ...rowProps }}
          columns={[
            {
              property: "index",
              header: "Rank",
              size: "xsmall",
            },
            {
              property: "username",
              header: "Scribe",
              primary: true,
            },
            {
              property: "score",
              header: "Score",
            },
          ]}
          data={usersData}
          background={{
            header: "dark-2",
            body: ["white", "light-2"],
            footer: { dark: "light-2", light: "dark-3" },
          }}
        />
      </Box>
    </>
  );
}
