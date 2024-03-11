import { UserContext } from "../../contexts/users.context";
import { useContext, useEffect, useState } from "react";
import { getUserPointsByEmail, subtractPointsFromUser } from "../../utils/firebase/firebase.utils";
import Button from "../../components/button/button.component";

const Chat = () => {
    const { currentUser } = useContext(UserContext);
    const [userPoints, setUserPoints] = useState(null);

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

    const handleSubtractPoints = async () => {
        try {
            // Subtract 5 points from the user
            const updatedPoints = await subtractPointsFromUser(currentUser.email, 5);
            // Update the user points state with the updated points
            setUserPoints(updatedPoints);
        } catch (error) {
            console.error("Error subtracting points:", error.message);
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <h2>Hi {currentUser ? currentUser.email : null}</h2>
            {userPoints !== null ? <p>User Points: {userPoints}</p> : null}
            {/* Button that subtracts 5 points from the user */}
            <Button onClick={handleSubtractPoints}>
                Subtract 5 points
            </Button>
        </div>
    );
}

export default Chat;
