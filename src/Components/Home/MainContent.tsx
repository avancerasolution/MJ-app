"use client";

import React, { Fragment } from "react";
import imaage from "./../../assets/placeholderFuneralimg.jpeg";
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
  const isTodaysDate = (dateString: string): boolean => {
    if (!dateString) return false;
    
    const today = new Date();
  
    
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    
    try {
      const dayMatches = dateString.includes(String(day));
      const monthMatches = dateString.toLowerCase().includes(month.toLowerCase());
      const yearMatches = dateString.includes(String(year));
      
      return dayMatches && monthMatches && yearMatches;
    } catch (error) {
      console.error("Error checking date:", error, dateString);
      return false;
    }
  };

  const filtered = data?.filter(item => isTodaysDate(item.EXPIRED_ON));
  
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
      };
    }) ?? [];


  console.log(obituaryData.length);
  return (
    <Fragment>
      <div className="MainContent">
        <Header />
        <div className="DeathData bg-" style={{ height: 'calc(100vh - 60px)' }}>
          {obituaryData.length > 0 && (
            <img src={InnaLillah} alt="InnaLillah" className="InnaLillah" />
          )}
          <div className="cardss" style={{ height: 'calc(100% - 60px)' }}>
            {obituaryData.length > 0 ? (
              <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                spaceBetween={25}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={obituaryData.length > 3}
                slidesPerGroup={1}
                style={{ width: '100%', height: '100%' }}
              >
                {obituaryData.map((item, i) => (
                  <SwiperSlide 
                    key={i} 
                    style={{
                      width: 'calc((100% - 50px) / 3)', 
                      height: '500px', 
                    }}
                  >
                    <VictimCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
              }}>
                <img 
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXfQsKihUzsUEtI0JF5CseuLZ8jztJ8esEHsgEnqryKYWvvvsR1F9I2YY&s=10"} 
                  alt="No obituaries available" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain'
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Fragment>
  );
};

export default MainContent;
