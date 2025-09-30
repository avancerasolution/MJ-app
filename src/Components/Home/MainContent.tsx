"use client";

import React, { Fragment } from "react";
import imaage from "./../../assets/Death.png";
import Header from "./Header";
import InnaLillah from "./../../assets/InnaLillah.png";
import VictimCard from "./VictimCard";
import Footer from "./Footer";

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
            {obituaryData.map((item: Obituary, i: number) => (
              <VictimCard key={i} item={item} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default MainContent;
