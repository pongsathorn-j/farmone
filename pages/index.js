import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import TableGrid from "../components/TableGrid";
import axios from "axios";

const LandingPage = ({ resultData }) => {
  const coloums = [
    { field: "id", headerName: "#" },
    { field: "title", headerName: "Title", width: "300" },
    { field: "body", headerName: "body", width: "400" },
  ];

  useEffect(() => {
    // console.log(resultData);
  }, []);

  const rows = resultData;

  return (
    <>
      <TableGrid rows={rows} coloums={coloums} />
    </>
  );

  return <></>;
};
LandingPage.auth = true;
export default LandingPage;

export async function getServerSideProps(context) {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const resultData = res.data;

  // Session
  // const session = await getSession(context);

  return {
    props: {
      // session,
      resultData,
    },
  };
}
