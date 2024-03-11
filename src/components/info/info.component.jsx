import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/users.context";
import { getUserPointsByEmail } from "../../utils/firebase/firebase.utils";

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
        <div className="absolute top-0 right-0 p-4 m-4 bg-white border border-gray-300 rounded-lg shadow-lg z-20 md:mr-60 lg:mr-5">
            {currentUser ? (
                <h1 className='nav-link mx-2' to={`/user/${userName}`}>Hi {userName}</h1>
            ) : (
                <h1 className='nav-link' to="/auth">Sign In</h1>
            )}
            {userPoints !== null ? <p> Tokens: {userPoints}</p> : null}
        </div>
    );
}

export default InfoBox;
