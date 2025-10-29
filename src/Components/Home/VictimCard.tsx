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
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        width: '100vw',          // ✅ increased from 60vw → 80vw
        maxWidth: '1100px',     // ✅ allow more breathing room on large screens
        margin: '30px auto',
        border: '1px solid #ccc',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      className="victim-card"
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#0b6623',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '22px',
          padding: '12px 0',
          textTransform: 'capitalize',
        }}
      >
        {item.jamatkhana}
      </div>

      {/* Name */}
      <div
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '24px',
          color: '#000',
          padding: '12px 0',
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
          gap: '24px',
          padding: '24px',
          backgroundColor: '#fff',
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            flex: '0 0 200px', // ✅ increased image size
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px solid #0b6623',
            padding: '6px',
            borderRadius: '6px',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={getImageSrc()}
            alt={`${item.firstName} ${item.lastName}`}
            style={{
              width: '190px',
              height: '220px', // ✅ larger image
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
        </div>

        {/* Right: Details */}
        <div
          style={{
            flex: 1,
            color: '#333',
            fontSize: '17px',
            lineHeight: 1.7,
          }}
        >
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
            <strong>Burial Date:</strong> {item.burialDate}
            <br />
            <strong>Time:</strong> {item.burialTime}
          </p>
          <p>
            <strong>Funeral Ceremony:</strong> {item.funeralCeremonyLocation}
          </p>
        </div>
      </div>

      {/* ✅ Add responsive adjustments */}
      <style>
        {`
          @media (max-width: 1024px) {
            .victim-card {
              width: 90vw;
            }
          }

          @media (max-width: 768px) {
            .victim-card div[style*="flex-direction: row"] {
              flex-direction: column !important;
              align-items: center;
            }

            .victim-card img {
              width: 70%;
              height: auto;
            }

            .victim-card {
              padding: 12px;
              width: 95vw;
            }
          }

          @media (max-width: 480px) {
            .victim-card {
              width: 95vw;
              font-size: 15px;
            }

            .victim-card div[style*="font-size: 24px"] {
              font-size: 18px !important;
            }

            .victim-card div[style*="padding: 24px"] {
              padding: 16px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default VictimCard
