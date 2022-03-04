import React from "react";
import { useRouter } from "next/router";

const DynamicAllRoute = () => {
  const router = useRouter();
  const { files = [] } = router.query;
  if (files.length >= 1) {
    const data = files.map((items) => {
      return `${items}/`;
    });
    return data;
  }
  return <div>DynamicAllRoute</div>;
};

export default DynamicAllRoute;
