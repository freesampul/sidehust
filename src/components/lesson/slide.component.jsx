// Slide.js
import React from 'react';
import Text from './text.component';

const Slide = ({ slide }) => {
  return (
    <div className="slide max-w-screen-sm">
      <img src={slide.image} alt={slide.alt} />
      <Text text={slide.text} />
    </div>
  );
};

export default Slide;
