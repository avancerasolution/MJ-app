import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export interface EventItem {
  name: string;
  date: string;
  time: string;
  description: string;
  occurance: string;
}

export interface EventType {
  name: string; // e.g., "Dua Timing", "Majalis Schedule", "Ticker"
  events: EventItem[];
}

export interface MajalisData {
  jk_code: string;
  jk_name: string;
  event_types: EventType[];
}

const PageHome = () => {
  const [data, setData] = useState<any>(null);
  const [duaTimings, setDuaTimings] = useState<EventItem[]>([]);
  const [majalisSchedule, setMajalisSchedule] = useState<EventItem[]>([]);
  const [tickerEvents, setTickerEvents] = useState<EventItem[]>([]);

  const apiKey =
    "7b33ea879023467028fd0a405925adfeffec217084f04467b1fd25f238c0809b";

  const fetchMajalisData = async () => {
    try {
      const res = await fetch("https://mayyatc.org/api/v1/jk/JK_DR/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({ api_key: apiKey }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      // ✅ Tell TS this is MajalisData
      const json: MajalisData = await res.json();
      console.log("Majalis API Response:", json);

      // ✅ Now TS knows e is of type EventType
      const dua = json.event_types.find(
        (e: EventType) => e.name === "Dua Timing"
      );
      const majalis = json.event_types.find(
        (e: EventType) => e.name === "Majalis Schedule"
      );
      const ticker = json.event_types.find(
        (e: EventType) => e.name === "Ticker"
      );

      setDuaTimings(dua?.events || []);
      setMajalisSchedule(majalis?.events || []);
      setTickerEvents(ticker?.events || []);
    } catch (error) {
      console.error("Error fetching Majalis data:", error);
    }
  };

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

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchMajalisData();

     const interval = setInterval(() => {
    console.log("♻️ Refetching funeral and Majalis data...");
    fetchData();
    fetchMajalisData();
  }, 5 * 60 * 1000); // 5 minutes in milliseconds

  return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <Fragment>
      <div className="PageHome">
        <Sidebar majalisSchedule={majalisSchedule}  />
        <MainContent data={data} duaTimings={duaTimings} />
      </div>
    </Fragment>
  );
};

export default PageHome;
