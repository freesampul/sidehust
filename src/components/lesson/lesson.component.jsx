import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/users.context';
import { Link } from 'react-router-dom';
import Slide from './slide.component';
import { getPurchasedCourses } from '../../utils/firebase/firebase.utils';

const Lesson = ({ slides }) => {
  const { currentUser } = useContext(UserContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        if (currentUser) {
          const courses = await getPurchasedCourses(currentUser.email);
          setPurchasedCourses(courses);
          setLoading(false);
        } else {
          setLoading(false); // Set loading to false if no user
        }
      } catch (error) {
        console.error("Error fetching purchased courses:", error.message);
        setLoading(false);
      }
    };
    fetchPurchasedCourses();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && slides.length > 0 && purchasedCourses.length > 0) {
      const courseTitles = slides.map(slide => slide.courseTitle);
      const userPurchasedCourses = purchasedCourses.map(course => course.title);
      const isPurchased = courseTitles.some(title => userPurchasedCourses.includes(title));
      setPurchased(isPurchased);
    }
  }, [currentUser, slides, purchasedCourses]);
  
  const goToNextSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentSlideIndex(prevIndex => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-red-50 to-white-100">
      {!loading && (
        <div className="lesson flex flex-col items-center">
          {(slides.length > 0 && (slides[0].price === 0 || purchased)) ? (
            <>
              <Slide slide={slides[currentSlideIndex]} />
              <div className="navigation flex mt-4">
                <button onClick={goToPreviousSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
                  Previous
                </button>
                <button onClick={goToNextSlide} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold mb-4">You haven't purchased this course yet.</h2>
              <Link to="/lessons" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Browse Lessons
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Lesson;
