import React from 'react';
import LessonBox from '../lesson-box/lesson-box.component';
import lessonData from '../../lessonData/lessonData'
import './lessons-preview.styles.css';

const LessonsPreview = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-red-50 to-white-100">
    <div className="courses-container">
      {lessonData.map((course) => (
        <LessonBox
          key={course.id}
          title={course.title}
          thumbnailSrc={course.slides[0].image} 
          buttonText={`Unlock for ${course.slides[0].price} tokens`}
          buttonAction={() => console.log(`Buy ${course.title}`)}
        />
      ))}
    </div>
    </div>
  );
};

export default LessonsPreview;
