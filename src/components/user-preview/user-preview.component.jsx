import Button from "../button/button.component";
import { signOutUser, getUserPointsByEmail, getSubscriptionManagementUrl } from "../../utils/firebase/firebase.utils";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/users.context';
import { Navigate } from 'react-router-dom';

const UserPreview = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userPoints, setUserPoints] = useState(null);
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

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Welcome to the account page, {userName}!</h1>
      <h2 className="text-lg font-semibold mb-2">Manage Subscription</h2>
      <h3 className="text-lg mb-4">Token Count: {userPoints}</h3>
      <Button onClick={signOutUser} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md">Sign Out</Button>
      <Button onClick={getSubscriptionManagementUrl}>Click</Button>
    </div>
  );
};

export default UserPreview;
