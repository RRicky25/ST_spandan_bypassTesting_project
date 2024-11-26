import React, { useState, useEffect } from 'react';

const photos = [
  "/sports-assets/cricket.png",
  "/sports-assets/football.png",
  "/sports-assets/volleyball.png",
  "/sports-assets/basketball.png",
];

const Slideshow = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 1000); // 1 second delay

    return () => clearInterval(intervalId);
  }, [photos.length]);

  return (
    <div className="slideshow">
      <div className="slide">
        <img 
          src={photos[currentPhotoIndex]} 
          alt={`Slide ${currentPhotoIndex + 1}`} 
          style={{ maxWidth: '130px', maxHeight: '130px', objectFit: 'fill' }} 
        />
      </div>
    </div>
  );
};

export default Slideshow;
