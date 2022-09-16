import React from "react";
import { firestore } from "../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { PageHeader, Box, Select } from "grommet";
import { getUser } from "../fireBaseUser";
import { MainContext, useContext } from "../context";

export default function Classroom() {
  // get classes from firestore
  const { userData, setUserData } = useContext(MainContext);
  const [userClassData, setUserClassData] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [render, setRender] = React.useState(<></>);
  React.useEffect(() => {
    async function getClasses() {
      const classesRef = collection(firestore, "classes");
      const classesSnapshot = await getDocs(classesRef);
      const classesList = classesSnapshot.docs.map((doc) => doc.data());
      setClasses(classesList);
      if (userData.class) {
        let userClassId = userData.class.id;
        let userClass = await getDoc(doc(firestore, "classes", userClassId));
        setUserClassData(userClass.data());
      } else {
        console.log("no class");
      }
    }
    getClasses();
  }, []);
  React.useEffect(() => {
    function render() {
      if (userData) {
        if (userData.class) {
          return (
            <>
              <PageHeader title="My Class" />
              <Box pad="medium" gap="medium">
                {userClassData.name}
              </Box>
            </>
          );
        } else {
          return (
            <>
              <PageHeader title="My Class" />
              <Box pad="medium" gap="medium">
                <Select
                  options={classes.map((classData) => classData.name)}
                  labelKey="name"
                  valueKey="id"
                  onChange={({ option }) => {
                    console.log(option);
                  }}
                />
              </Box>
            </>
          );
        }
      } else {
        return <>Please log in</>;
      }
    }
    setRender(render());
  }, [userData]);
  return <>{render}</>;
}
