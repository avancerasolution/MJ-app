"use client";

import React, { Fragment } from "react";
import imaage from "./../../assets/placeholderFuneralimg.jpeg";
import Header from "./Header";
import InnaLillah from "./../../assets/InnaLillah.png";
import VictimCard from "./VictimCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { EventItem } from "./PageHome";

interface RawObituary {
  JAMATKHANA: string;
  NAME: string;
  EXPIRED_ON: string;
  AGE: string;
  ADDRESS: string;
  BURIAL_DATE: string;
  BURIAL_TIME: string;
  FUNERAL_CEREMONY: string;
  PHOTO: string;
}

export interface Obituary {
  firstName: string;
  lastName: string;
  deathDate: string;
  age: number;
  address: string;
  burialDate: string;
  burialTime: string;
  funeralCeremonyLocation: string;
  image: string;
  jamatkhana: string;
}

interface MainContentProps {
  data?: RawObituary[] | null;
  duaTimings: EventItem[];
}

const MainContent: React.FC<MainContentProps> = ({ data, duaTimings }) => {
  const shouldShowObituary = (item: RawObituary): boolean => {
    if (!item) return false;

    if (
      item.BURIAL_DATE === "To be announced later" ||
      item.BURIAL_TIME === "To be announced later"
    ) {
      return true;
    }

    const today = new Date();
    try {
      const dateMatch = item.BURIAL_DATE.match(/(\d+)\s+(\w+),\s+(\d+)/);
      if (!dateMatch) return true;

      const day = parseInt(dateMatch[1], 10);
      const month = dateMatch[2];
      const year = parseInt(dateMatch[3], 10);

      const timeMatch = item.BURIAL_TIME.match(/(\d+):(\d+)\s+(AM|PM)/i);
      let hour = 0;
      let minute = 0;

      if (timeMatch) {
        hour = parseInt(timeMatch[1], 10);
        if (timeMatch[3].toUpperCase() === "PM" && hour < 12) hour += 12;
        if (timeMatch[3].toUpperCase() === "AM" && hour === 12) hour = 0;
        minute = parseInt(timeMatch[2], 10);
      }

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIndex = months.findIndex((m) => month.includes(m));

      if (monthIndex === -1) return true;

      const burialDateTime = new Date(year, monthIndex, day, hour, minute);
      return burialDateTime >= today;
    } catch {
      return true;
    }
  };

  const filtered = data?.filter(shouldShowObituary);

  const obituaryData: Obituary[] =
    filtered?.map((item: RawObituary) => {
      const [firstName, ...rest] = item.NAME.split(" ");
      const lastName = rest.join(" ");
      const numericAge = parseInt(item.AGE, 10);

      return {
        firstName,
        lastName,
        deathDate: item.EXPIRED_ON,
        age: isNaN(numericAge) ? 0 : numericAge,
        address: item.ADDRESS,
        burialDate: item.BURIAL_DATE,
        burialTime: item.BURIAL_TIME,
        funeralCeremonyLocation: item.FUNERAL_CEREMONY,
        image: item.PHOTO || imaage,
        jamatkhana: item.JAMATKHANA,
      };
    }) ?? [];

  return (
    <Fragment>
      <div className="MainContent">
        <Header duaTimings={duaTimings} />

        <div
          className="DeathData"
          style={{
            minHeight: "calc(100vh - 60px)",
            backgroundColor: "#f4f6f4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 10px",
          }}
        >
          {obituaryData.length > 0 && (
            <img
              src={InnaLillah}
              alt="InnaLillah"
              className="InnaLillah"
              style={{
                width: "300px",
                maxWidth: "80%",
                marginBottom: "20px",
              }}
            />
          )}

          <div
            className="cardss"
            style={{
              width: "100%",
              maxWidth: "1200px",
              overflow: "hidden",
            }}
          >
            {obituaryData.length > 0 ? (
              <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                spaceBetween={20}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                loop
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "30px",
                }}
              >
                {obituaryData.map((item, i) => (
                  <SwiperSlide
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VictimCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <img
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfQsKihUzsUEtI0JF5CseuLZ8jztJ8esEHsgEnqryKYWvvvsR1F9I2YY&s=10"
                  }
                  alt="No obituaries available"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainContent;
