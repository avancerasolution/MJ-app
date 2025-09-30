import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const PageHome = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("https://mayyatc.org/api/v1/funerals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "7b33ea879023467028fd0a405925adfeffec217084f04467b1fd25f238c0809b",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log("API Response:", json);
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
