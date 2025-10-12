'use client'

import React from 'react'

interface ObituaryItem {
  jamatkhana?: string;
  firstName: string;
  lastName: string;
  deathDate: string;
  age: number | string;
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
  const isBase64Image = (str: string): boolean => /^data:image\/[a-z]+;base64,/i.test(str);

  const getImageSrc = (): string => {
    if (!item.image) return '';
    if (isBase64Image(item.image)) return item.image;
    if (item.image.length > 100 && /^[A-Za-z0-9+/=]+$/.test(item.image)) {
      return `data:image/jpeg;base64,${item.image}`;
    }
    return item.image;
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '60vw',
        maxWidth: '800px',
        margin: '20px auto',
        border: '1px solid #ddd',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#0b6623',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          padding: '8px 0',
          textTransform: 'capitalize',
        }}
      >
        {item.jamatkhana }
      </div>

      {/* Name */}
      <div
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '20px',
          color: '#000',
          padding: '10px 0',
          borderBottom: '1px solid #ddd',
        }}
      >
        {item.firstName} {item.lastName}
      </div>

      {/* Content Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '20px',
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            flex: '0 0 150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #0b6623',
            padding: '4px',
            borderRadius: '4px',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={getImageSrc()}
            alt={`${item.firstName} ${item.lastName}`}
            style={{
              width: '140px',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Right: Details */}
        <div style={{ flex: 1, color: '#333', fontSize: '15px', lineHeight: 1.5 }}>
          <p>
            <strong>Expired On:</strong> {item.deathDate}
          </p>
          <p>
            <strong>Age:</strong> {item.age} years
          </p>
          <p>
            <strong>Address:</strong> {item.address}
          </p>
          <p>
            <strong>Burial Date:</strong> {item.burialDate }
            <br />
            <strong>Time:</strong> {item.burialTime}
          </p>
          <p>
            <strong>Funeral Ceremony:</strong> {item.funeralCeremonyLocation }
          </p>
        </div>
      </div>
    </div>
  )
}

export default VictimCard
