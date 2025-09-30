import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const PageHome = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://mayyatc.org/api/v1/funerals");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Fetched data:", data);

  return (
    <Fragment>
      <div className="PageHome">
        <Sidebar />
        <MainContent data={data} />
      </div>
    </Fragment>
  );
};

export default PageHome;
