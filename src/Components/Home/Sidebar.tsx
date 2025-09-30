import React, { Fragment } from 'react'
import Majalis from './../../assets/majalis.png'

const Sidebar = () => {

  const arr = [
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Panch Bara (5/12) Saal Majalis"
    },
    {
      date: "Sep 06, 2025",
      day: "Monday",
      event: "Eid-e-Milad-un-Nabi (s.a.s) Majalis"
    },
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Aam Brotherhood & Sisterhood Majalis"
    },
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Bait-ul-Khayal Majalis"
    },
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Chandraat and Majalis (Rabi ul Sani)"
    },
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Samar Chantta Majalis"
    },
    {
      date: "Sep 01, 2025",
      day: "Monday",
      event: "Bait-ul-Khayal Chantta Raat Morning Majalis "
    }
  ]

  return (
    <Fragment>
      <div className="sidbar">
        <div className="heads">
          <img src={Majalis} alt="Majalis" />
          <h3>majalis <br /> schedule</h3>
        </div>

        <div className="listing">
          {arr.map((item, i) => (
            <div className="daata" key={i}>
              <p>{item.date} - {item.day}</p>
              <h3>{item.event}</h3>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default Sidebar