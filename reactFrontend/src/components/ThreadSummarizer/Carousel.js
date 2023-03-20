import React from "react";

export default function Carousel({ media }) {
  return (
    <div className='carousel carousel-center rounded-box'>
      {media.map((item, id, images) => (
        <div className='carousel-item h-80'>
          <img
            src={item}
            alt='Pizza'
          />
        </div>
      ))}
    </div>
  );
}
