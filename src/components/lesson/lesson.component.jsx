import React, { useState } from 'react';
import Slide from './slide.component';

const Lesson = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-red-50 to-white-100">
    <div className="lesson flex flex-col items-center">
      <Slide slide={slides[currentSlideIndex]} />
      <div className="navigation flex mt-4">
        <button onClick={goToPreviousSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
          Previous
        </button>
        <button onClick={goToNextSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
          Next
        </button>
      </div>
      </div>
      </div>
  );
};

export default Lesson;
