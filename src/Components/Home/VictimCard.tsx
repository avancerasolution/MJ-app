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
  const isBase64Image = (str: string): boolean => {
    const base64Regex = /^data:image\/[a-z]+;base64,/i;
    return base64Regex.test(str);
  };

  const getImageSrc = (): string => {
    if (!item.image) return '';
    
    if (isBase64Image(item.image)) {
      return item.image;
    }
    
    try {
      if (item.image.length > 100 && /^[A-Za-z0-9+/=]+$/.test(item.image)) {
        return `data:image/jpeg;base64,${item.image}`;
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
    return item.image;
  };
  
  return (
    <Fragment>
      <div className='card' style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>
        <img 
          src={getImageSrc()} 
          alt={`${item.firstName} ${item.lastName}`} 
          style={{
            width: '100%',
            height: '40%',
            objectFit: 'cover',
            marginBottom: '15px',
            flexShrink: 0
          }}
        />
        <div className='victimName'>
          <p style={{fontWeight: 700, margin: '0 0 5px 0'}}>{item.firstName}</p>
          <p style={{margin: '0 0 10px 0'}}>{item.lastName}</p>
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '10px'}}>
          <div>
            <p className='lightt' style={{margin: '0 0 2px 0', fontSize: '12px'}}>DEATH DATE</p>
            <p className='boold' style={{margin: 0, wordBreak: 'break-word'}}>{item.deathDate}</p>
          </div>
          <div>
            <p className='lightt' style={{margin: '0 0 2px 0', fontSize: '12px'}}>AGE</p>
            <p className='boold' style={{margin: 0}}>{item.age}</p>
          </div>
        </div>

        <div style={{marginBottom: '10px'}}>
          <p className='lightt' style={{margin: '0 0 2px 0', fontSize: '12px'}}>ADDRESS</p>
          <p className='boold' style={{margin: 0, wordBreak: 'break-word'}}>{item.address}</p>
        </div>

        <div style={{marginBottom: '10px'}}>
          <p className='lightt' style={{margin: '0 0 2px 0', fontSize: '12px'}}>BURIAL DATE</p>
          <p className='boold' style={{margin: 0, wordBreak: 'break-word'}}>{item.burialDate} {item.burialTime}</p>
        </div>

        <div style={{marginBottom: '10px'}}>
          <p className='lightt' style={{margin: '0 0 2px 0', fontSize: '12px'}}>FUNERAL CEREMONY</p>
          <p className='boold' style={{margin: 0, wordBreak: 'break-word'}}>{item.funeralCeremonyLocation}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default VictimCard