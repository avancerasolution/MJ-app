'use client'

import React, { useEffect, useState } from 'react';
import morning from './../../assets/MorningDua.png'
import night from './../../assets/NightDua.png'
import sun from './../../assets/sun.svg'
import { EventItem } from './PageHome';

interface HeaderProps {
  duaTimings: EventItem[];
}
const Header: React.FC<HeaderProps> = ({ duaTimings }) => {
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  const morningDuaTime = duaTimings.find(dua => dua.name.toLowerCase().includes('morning'))?.time;
  const eveningDuaTime = duaTimings.find(dua => dua.name.toLowerCase().includes('evening'))?.time;

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time (e.g. 10:00 pm)
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      const time = now.toLocaleTimeString('en-GB', timeOptions).toLowerCase();

      // Format date (e.g. Thursday, 11 September 2025)
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      };
      const date = now.toLocaleDateString('en-GB', dateOptions);

      // Get GMT offset (e.g. GMT+5)
      const offset = -now.getTimezoneOffset() / 60;
      const gmtOffset = `GMT${offset >= 0 ? '+' : ''}${offset}`;

      setTimeString(`it’s ${time}`);
      setDateString(`${date} (${gmtOffset})`);
    };

    updateDateTime(); // Initial render
    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="mainHeader">
      <div className="dateTime">
        <div className='timmmee'>{timeString}</div>
        <div className='daateee'>{dateString}</div>
      </div>

      <div className="duaa">
        <div className="morningg">
          <img src={sun} alt="morning" />
          <div>
            <span>MORNING DUA TIME</span>
            <p>{morningDuaTime}</p>
          </div>
        </div>

        <div className="morningg">
          <img src={night} alt="night" />
          <div>
            <span>EVENING DUA TIME</span>
            <p>{eveningDuaTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
