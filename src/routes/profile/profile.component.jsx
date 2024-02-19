import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/users.context';
import UserProfile from '../../components/user-profile/user-profile.component';
import './profile.styles.scss';
import { doesUserExist } from '../../utils/firebase/firebase.utils';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userExists, setUserExists] = useState(null);
  const { user } = useParams();

  useEffect(() => {
    const checkUserExistence = async () => {
      const exists = await doesUserExist(user);
      setUserExists(exists);
    };

    checkUserExistence();
  }, [user]);

  return (
    <>
      <div className='profile-container'>
        {userExists === null ? (
          <p>Loading...</p>
        ) : userExists ? (
            <UserProfile />
        ) : (
          <h1>This user does not exist!</h1>
        )}
      </div>
    </>
  );
}

export default Profile;
