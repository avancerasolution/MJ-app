'use client'

import React, { Fragment } from 'react'

interface ObituaryItem {
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

interface Props {
  item: ObituaryItem;
}
const VictimCard: React.FC<Props> = ({ item }) => {
  return (
    <Fragment>
      <div className='card'>
        <img src={item.image} alt={item.image} />
        <div className='victimName'>
          <p style={{fontWeight: 700}}>{item.firstName}</p>
          <p>{item.lastName}</p>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'}}>
          <div>
            <p className='lightt'>DEATH DATE</p>
            <p className='boold'>{item.deathDate}</p>
          </div>
          <div>
            <p className='lightt'>AGE</p>
            <p className='boold'>{item.age}</p>
          </div>
        </div>

        <div>
          <p className='lightt'>ADDRESS</p>
          <p className='boold'>{item.address}</p>
        </div>


        <div>
          <p className='lightt'>BURIAL DATE</p>
          <p className='boold'>{item.burialDate} {item.burialTime}</p>
        </div>

        <div>
          <p className='lightt'>FUNERAL CEREMONY</p>
          <p className='boold'>{item.funeralCeremonyLocation}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default VictimCard