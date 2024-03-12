import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/users.context";
import { getUserPointsByEmail } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./info.styles.css"; // Import CSS file for styling

const InfoBox = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [userPoints, setUserPoints] = useState(null);

    const userName = currentUser ? currentUser.displayName : null;

    useEffect(() => {
        if (currentUser) {
            setCurrentUser(currentUser);
        }
    }, [currentUser, setCurrentUser]);

    useEffect(() => {
        // Fetch user points when currentUser changes
        if (currentUser) {
            getUserPointsByEmail(currentUser.email)
                .then(points => {
                    setUserPoints(points);
                })
                .catch(error => {
                    console.error("Error fetching user points:", error.message);
                });
        }
    }, [currentUser]);

    return (
        <div className="info-box-container">
            {currentUser ? (
                <Link to={`/user/${userName}`} className="info-box-content">
                    <h1 className='nav-link mx-2'>Hi {userName}</h1>
                    {userPoints !== null && <p>Tokens: {userPoints}</p>}
                </Link>
            ) : (
                <Link to="/auth" className="info-box-content">
                    <h1 className='nav-link'>Sign In</h1>
                </Link>
            )}
        </div>
    );
}

export default InfoBox;
