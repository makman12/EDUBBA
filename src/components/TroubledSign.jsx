import React from "react";
import { HzlCuneiform } from "./HzlCuneiform";
import FindValueRender from "./FindValueRender";
import { Box, PageHeader, Text, PageContent, Page, DataTable } from "grommet";
import { collection, getDoc, doc } from "firebase/firestore";
import { MainContext, useContext } from "../context";
import CuneiformLinkBox from "./CuneiformLinkBox";

export default function TroubledSign() {
  const { userData } = useContext(MainContext);
  const [mistakes, setMistakes] = React.useState([]);
  const [mightConfuse, setMightConfuse] = React.useState(<></>);
  React.useEffect(() => {
    async function getMistakes() {
      if (!userData) return;
      let mistakes = userData.mistakes;
      const mistakeDoc = await getDoc(mistakes);
      setMistakes(mistakeDoc.data().list);
      console.log(mistakeDoc.data().list);
    }
    getMistakes();
  }, [userData]);
  if (!userData) return <></>;
  // mistakes is an object with keys of hzl and values of objects with keys of values

  function rowClick(row) {
    console.log(row);
    let render = (
      <>
        Here are some signs that might confuse you with <b>{row.value}</b>
        <FindValueRender value={row.confusedValue} />
      </>
    );
    setMightConfuse(render);
  }
  return (
    <>
      <Box pad="medium" gap="medium">
        <DataTable
          sort={{ property: "count", direction: "desc" }}
          paginate={{ step: 10 }}
          data={mistakes}
          onClickRow={(event) => {
            rowClick(event.datum);
          }}
          columns={[
            {
              property: "hzl",
              header: "Sign",
              primary: true,
              render: (hzl) => <CuneiformLinkBox hzl={hzl.hzl} />,
            },
            {
              property: "value",
              header: "Value",
            },
            {
              property: "confusedValue",
              header: "Confused With",
            },

            {
              property: "count",
              header: "Times Mistaken",
            },
          ]}
        />
      </Box>
      <Box align="center">{mightConfuse}</Box>
    </>
  );
}
