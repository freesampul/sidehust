import React, { useState, useEffect } from 'react';
import LessonBox from '../lesson-box/lesson-box.component';
import lessonData from '../../lessonData/lessonData';
import './lessons-preview.styles.css';
import { addCourseToPurchased, getPurchasedCourses, subtractPointsFromUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/users.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const LessonsPreview = () => {
  const { currentUser } = useContext(UserContext);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const courses = await getPurchasedCourses(currentUser.email);
        setPurchasedCourses(courses);
      } catch (error) {
        console.error("Error fetching purchased courses:", error.message);
      }
    };
    if (currentUser) {
      fetchPurchasedCourses();
    }
  }, [currentUser]);

  const addCourseToPurchasedCourses = async (course) => {
    try {
      if (course.slides[0].price === 0) {
        await addCourseToPurchased(currentUser.email, course.title);
        setPurchasedCourses([...purchasedCourses, course.title]); // Update purchased courses locally
        navigate(`/lessons/${course.title}`);
      } else {
        await addCourseToPurchased(currentUser.email, course.title);
        await subtractPointsFromUser(currentUser.email, course.slides[0].price); // Subtract points equal to the price of the course
        setPurchasedCourses([...purchasedCourses, course.title]); // Update purchased courses locally
      }
    } catch (error) {
      alert("You don't have enough tokens to unlock this course");
    }
  };

  const renderButton = (course) => {
    if (purchasedCourses.includes(course.title)) {
      return (
        <button onClick={() => navigate(`/lessons/${course.title}`)}>Learn now</button>
      );
    } else if (course.slides[0].price === 0) {
      return (
        <button onClick={() => navigate(`/lessons/${course.title}`)}>Learn now</button>
      );
    } else {
      return (
        <button onClick={() => addCourseToPurchasedCourses(course)}>
          Unlock for {course.slides[0].price} tokens
        </button>
      );
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-red-50 to-white-100">
      <div className="courses-container">
        {lessonData.map((course) => (
          <LessonBox
            key={course.id}
            title={course.title}
            thumbnailSrc={course.slides[0].image}
            buttonText={renderButton(course)}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsPreview;
