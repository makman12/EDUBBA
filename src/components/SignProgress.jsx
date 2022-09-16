import React from "react";
import { Box, PageHeader, Text, PageContent, Page, DataTable } from "grommet";
import { collection, getDoc, doc } from "firebase/firestore";
import { MainContext, useContext } from "../context";
import CuneiformLinkBox from "./CuneiformLinkBox";
import lessonsObject from "../myscripts/lessons.json";

function findLesson(hzl) {
  // lessonsObject is object with key is lesson number and value is array of hzl
  for (let key of Object.keys(lessonsObject)) {
    if (lessonsObject[key].includes(+hzl)) {
      return key;
    }
  }
}

export default function SignProgress() {
  const { userData } = useContext(MainContext);
  const [signData, setSignData] = React.useState([]);
  const [rowProps, setRowProps] = React.useState({});
  React.useEffect(() => {
    async function getSignData() {
      if (!userData) return;
      let signs = userData.signs;
      const signDoc = await getDoc(signs);
      let newSignData = signDoc.data();
      newSignData = Object.keys(newSignData).map((key) => {
        return {
          count: newSignData[key],
          hzl: key,
          learned: newSignData[key] >= 15,
          lesson: +findLesson(+key),
        };
      });
      setSignData(newSignData);
      console.log(newSignData, "signData");
      let newRowProps = {};
      newSignData.forEach((sign) => {
        if (sign.learned) {
          newRowProps[sign.hzl] = {
            background: { color: "status-ok", opacity: "medium" },
            pad: "small",
          };
        }
      });

      setRowProps(newRowProps);
      console.log(newRowProps, "rowProps");
    }

    getSignData();
  }, [userData]);
  if (!userData) return <></>;
  return (
    <Box>
      <DataTable
        sort={{ property: "count", direction: "desc" }}
        paginate={{ step: 10 }}
        data={signData}
        rowProps={rowProps}
        columns={[
          {
            property: "lesson",
            header: "Lesson",
          },
          {
            property: "hzl",
            header: "Sign",
            primary: true,
            render: (hzl) => <CuneiformLinkBox hzl={hzl.hzl} />,
          },
          {
            property: "count",
            header: "Count",
          },
        ]}
      />
    </Box>
  );
}
