import Button from "../button/button.component";
import { useParams } from 'react-router-dom';
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useContext } from 'react';
import { UserContext } from '../../contexts/users.context';

const UserPreview = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <div>
        You are on the user page, navigate to a specific user
        <Button onClick={signOutHandler}>Sign Out</Button>
    </div>
  );
};

export default UserPreview;
