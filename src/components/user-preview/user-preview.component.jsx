import Button from "../button/button.component";
import { signOutUser, getUserPointsByEmail, cancelSubscription, getPurchasedCourses, firebaseApp } from "../../utils/firebase/firebase.utils";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/users.context';
import { Navigate } from 'react-router-dom';

const UserPreview = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userPoints, setUserPoints] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = currentUser ? currentUser.displayName : null;

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      getUserPoints();
      getPurchasedCoursesForUser();
    }
  }, [currentUser]);

  const getUserPoints = async () => {
    try {
      const points = await getUserPointsByEmail(currentUser.email);
      setUserPoints(points);
    } catch (error) {
      console.error("Error fetching user points:", error.message);
    } finally {
      setLoading(false); 
    }
  };

  const getPurchasedCoursesForUser = async () => {
    try {
      const courses = await getPurchasedCourses(currentUser.email);
      setPurchasedCourses(courses);
      console.log(courses);
    } catch (error) {
      console.error("Error fetching purchased courses:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  const cancelSub = async () => {
    try {
      await cancelSubscription(firebaseApp);
    } catch (error) {
      console.error("Error canceling subscription:", error.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold mb-4 text-center">Welcome to your account page, {userName}!</h1>
      <h2 className="text-2xl font-semibold mb-2">Token Count: {userPoints}</h2>
      <h2 className="text-xl font-semibold mb-2">Purchased Courses:</h2>
      <ul>
      {purchasedCourses.map(course => (
          <li className="text-lg font-semibold mb-2 ml-5" key={course}>{course}</li>
        ))}
      </ul>
      <Button onClick={signOutUser} className="mt-5 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md">Sign Out</Button>
    </div>
  );
};

export default UserPreview;
