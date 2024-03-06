import React from 'react';
import LessonBox from '../lesson-box/lesson-box.component';
import lessonData from '../../lessonData/lessonData'
import './lessons-preview.styles.css';

const LessonsPreview = () => {
  return (
    <div className="courses-container">
      {lessonData.map((course, index) => (
        <LessonBox
          key={course.id}
          title={course.title}
          thumbnailSrc={course.slides[0].image} 
          buttonText="Buy for 5 Tokens"
          buttonAction={() => console.log(`Buy ${course.title}`)}
        />
      ))}
    </div>
  );
};

export default LessonsPreview;
