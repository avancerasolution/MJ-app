import React, { Fragment } from 'react'
import Majalis from './../../assets/majalis.png'
import { EventItem } from './PageHome';


interface SidebarProps {
  majalisSchedule: EventItem[];
}


const Sidebar: React.FC<SidebarProps> = ({ majalisSchedule }) => {

  // const arr = [
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Panch Bara (5/12) Saal Majalis"
  //   },
  //   {
  //     date: "Sep 06, 2025",
  //     day: "Monday",
  //     event: "Eid-e-Milad-un-Nabi (s.a.s) Majalis"
  //   },
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Aam Brotherhood & Sisterhood Majalis"
  //   },
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Bait-ul-Khayal Majalis"
  //   },
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Chandraat and Majalis (Rabi ul Sani)"
  //   },
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Samar Chantta Majalis"
  //   },
  //   {
  //     date: "Sep 01, 2025",
  //     day: "Monday",
  //     event: "Bait-ul-Khayal Chantta Raat Morning Majalis "
  //   }
  // ]

  const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

const upcomingMajalis = majalisSchedule.filter(
    (item) => item.occurance?.toUpperCase() === 'FUTURE'
  );



  return (
    <Fragment>
      <div className="sidbar">
        <div className="heads">
          {/* <img src={Majalis} alt="Majalis" /> */}
          <h3>majalis schedule</h3>
        </div>

        <div className="listing">
          {upcomingMajalis.map((item, i) => (
            <div className="daata" key={i}>
              <p>  {formatDate(item.date) || "No Date"} {item.time && `- ${item.time}`}</p>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default Sidebar