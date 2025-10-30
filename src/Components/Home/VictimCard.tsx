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
        backgroundColor: '#fafafa',
        borderRadius: '14px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        width: '95vw',
        maxWidth: '1200px', // ⬆️ Increased max width for desktop
        margin: '40px auto',
        border: '1px solid #ddd',
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
          fontSize: '26px', // ⬆️ Larger header font
          padding: '16px 0',
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
          fontSize: '30px', // ⬆️ Larger name font
          color: '#000',
          padding: '16px 0',
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
          gap: '40px', // ⬆️ more breathing room
          padding: '40px', // ⬆️ more padding
          backgroundColor: '#fff',
        }}
      >
        {/* Left: Image */}
        <div
          style={{
            flex: '0 0 280px', // ⬆️ Larger image section
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #0b6623',
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={getImageSrc()}
            alt={`${item.firstName} ${item.lastName}`}
            style={{
              width: '260px',
              height: '320px', // ⬆️ Larger image
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Right: Details */}
        <div
          style={{
            flex: 1,
            color: '#333',
            fontSize: '20px', // ⬆️ Bigger text
            lineHeight: 1.9,
          }}
        >
          <p><strong>Expired On:</strong> {item.deathDate}</p>
          <p><strong>Age:</strong> {item.age} years</p>
          <p><strong>Address:</strong> {item.address}</p>
          <p>
            <strong>Burial Date:</strong> {item.burialDate}<br />
            <strong>Time:</strong> {item.burialTime}
          </p>
          <p><strong>Funeral Ceremony:</strong> {item.funeralCeremonyLocation}</p>
        </div>
      </div>

      {/* ✅ Responsive adjustments */}
      <style>
        {`
          @media (max-width: 1024px) {
            .victim-card {
              max-width: 90vw;
            }

            .victim-card div[style*="font-size: 30px"] {
              font-size: 26px !important;
            }

            .victim-card div[style*="font-size: 20px"] {
              font-size: 18px !important;
            }
          }

          @media (max-width: 768px) {
            .victim-card div[style*="flex-direction: row"] {
              flex-direction: column !important;
              align-items: center;
              gap: 20px !important;
            }

            .victim-card img {
              width: 70% !important;
              height: auto !important;
            }

            .victim-card {
              width: 95vw;
              margin: 20px auto;
            }

            .victim-card div[style*="font-size: 30px"] {
              font-size: 22px !important;
            }

            .victim-card div[style*="font-size: 20px"] {
              font-size: 17px !important;
            }
          }

          @media (max-width: 480px) {
            .victim-card {
              width: 95vw;
              padding: 10px !important;
            }

            .victim-card img {
              width: 85% !important;
            }

            .victim-card div[style*="font-size: 30px"] {
              font-size: 20px !important;
            }

            .victim-card div[style*="font-size: 20px"] {
              font-size: 16px !important;
            }
          }
        `}
      </style>
    </div>
  )
}

export default VictimCard
