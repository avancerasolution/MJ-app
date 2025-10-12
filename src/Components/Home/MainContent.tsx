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
  jamatkhana: string;
}

interface MainContentProps {
  data?: RawObituary[] | null;
}
const MainContent: React.FC<MainContentProps> = ({ data }) => {
  const shouldShowObituary = (item: RawObituary): boolean => {
    if (!item) return false;
    
    // If burial date or time is "To be announced later", always show
    if (item.BURIAL_DATE === "To be announced later" || 
        item.BURIAL_TIME === "To be announced later") {
      return true;
    }
    
    const today = new Date();
    
    // Parse the burial date string (expecting format like "Monday, 13 Oct, 2025")
    try {
      // Extract parts from the burial date string
      const dateMatch = item.BURIAL_DATE.match(/(\d+)\s+(\w+),\s+(\d+)/);
      if (!dateMatch) return true; // If can't parse, show the obituary
      
      const day = parseInt(dateMatch[1], 10);
      const month = dateMatch[2]; // Oct
      const year = parseInt(dateMatch[3], 10);
      
      // Parse the burial time string (expecting format like "3:00 PM")
      const timeMatch = item.BURIAL_TIME.match(/(\d+):(\d+)\s+(AM|PM)/i);
      let hour = 0;
      let minute = 0;
      
      if (timeMatch) {
        hour = parseInt(timeMatch[1], 10);
        if (timeMatch[3].toUpperCase() === 'PM' && hour < 12) hour += 12;
        if (timeMatch[3].toUpperCase() === 'AM' && hour === 12) hour = 0;
        minute = parseInt(timeMatch[2], 10);
      }
      
      // Create a date object for the burial date and time
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = months.findIndex(m => month.includes(m));
      
      if (monthIndex === -1) return true; // If can't parse month, show the obituary
      
      const burialDateTime = new Date(year, monthIndex, day, hour, minute);
      
      // Show obituary if burial date/time is today or in the future
      return burialDateTime >= today;
    } catch (error) {
      console.error("Error checking burial date:", error, item.BURIAL_DATE, item.BURIAL_TIME);
      return true; // If there's any error in parsing, show the obituary
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



  console.log("Obituaries to display:", obituaryData);
  console.log("Filtered from total data entries:", data?.length || 0);
  return (
    <Fragment>
      <div className="MainContent">
        <Header />
        <div className="DeathData bg-" style={{ height: 'calc(100vh - 60px)' }}>
          {obituaryData.length > 0 && (
            <img src={InnaLillah} alt="InnaLillah" className="InnaLillah" />
          )}
          <div className="cardss" style={{ 
            height: 'calc(100% - 60px)',
            width: '100%',
            overflow: 'hidden'
          }}>
            {obituaryData.length > 0 ? (
          <Swiper
  modules={[Autoplay, Pagination]}
  slidesPerView={1} // ✅ one card visible
  spaceBetween={0}
  autoplay={{ delay: 5000, disableOnInteraction: false }}
  // pagination={{ clickable: true }}
  loop={true} // ✅ now you can safely loop since only one slide visible
  style={{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  }}
>
  {obituaryData.map((item, i) => (
    <SwiperSlide
      key={i}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "50vw", // ✅ takes half of TV screen width
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        <VictimCard item={item} />
      </div>
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
