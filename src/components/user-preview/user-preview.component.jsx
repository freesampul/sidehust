import Button from "../button/button.component";
import { useParams } from 'react-router-dom';
import { signOutUser, deleteAccount } from "../../utils/firebase/firebase.utils"; // Import deleteAccount function if you have one
import { useContext } from 'react';
import { UserContext } from '../../contexts/users.context';

const UserPreview = () => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  // Function to handle account deletion
  const deleteAccountHandler = async () => {
    try {
      // Call the deleteAccount function from Firebase utils
      await deleteAccount(currentUser.id); // Assuming you pass user id to deleteAccount function
      // If account deletion is successful, sign out the user and update currentUser state
      await signOutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error deleting account:", error.message);
      // Handle any errors or display error message to the user
    }
  }

  return (
    <div>
      <h1>Welcome to the account page, {currentUser.displayName}!</h1>
      <h2>Manage Subscription</h2>
      <h3>Token Count: {currentUser.tokenCount}</h3> {/* Assuming token count is stored in currentUser object */}
      <h3>Delete Account?</h3>
      <Button onClick={deleteAccountHandler}>Delete Account</Button>
      <Button onClick={sign}>Sign Out</Button>
    </div>
  );
};

export default UserPreview;
