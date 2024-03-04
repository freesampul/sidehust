import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/users.context';
import './user-page.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
//Check if the user exists in firebase


const UserProfile = () => {
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
      }
    

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const userName = currentUser ? currentUser.displayName : null;

    const user = useParams();


    return (
        <>
        <div className="profile-header-container">
            <span>Username</span>
            <span>Posts</span>
            <span>Followers</span>
            <span>Following</span>
            <Button onClick={signOutHandler}>Sign Out</Button>
        </div>
        </>
    );
};
export default UserProfile;
