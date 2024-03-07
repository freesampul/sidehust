import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import LessonsPreview from '../../components/lessons-preview/lessons-preview.component';
import Lesson from '../../components/lesson/lesson.component';
import lessonData from '../../lessonData/lessonData';

const LessonsPage = () => {
  return (
    <Routes>
      <Route index element={<LessonsPreview />} />
      <Route path='/:lessonName' element={<LessonWithParams />} />
    </Routes>
  );
};

const LessonWithParams = () => {
  const { lessonName } = useParams();
  console.log(lessonName);

  const lesson = lessonData.find(lesson => lesson.title === lessonName);
  
  return lesson ? <Lesson slides={lesson.slides} /> : <div>Lesson not found</div>;
};

export default LessonsPage;
