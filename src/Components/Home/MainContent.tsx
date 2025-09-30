"use client";

import React, { Fragment } from "react";
import imaage from "./../../assets/Death.png";
import Header from "./Header";
import InnaLillah from "./../../assets/InnaLillah.png";
import VictimCard from "./VictimCard";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
}

interface MainContentProps {
  data?: RawObituary[] | null;
}
const MainContent: React.FC<MainContentProps> = ({ data }) => {
  const obituaryData: Obituary[] =
    data?.map((item: RawObituary) => {
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
        image: imaage,
      };
    }) ?? [];

  console.log(obituaryData.length);
  return (
    <Fragment>
      <div className="MainContent">
        <Header />
        <div className="DeathData">
          {obituaryData.length > 0 && (
            <img src={InnaLillah} alt="InnaLillah" className="InnaLillah" />
          )}
          <div className="cardss">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={3}
              spaceBetween={25}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {obituaryData.map((item, i) => (
                <SwiperSlide key={i}>
                  <VictimCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default MainContent;
