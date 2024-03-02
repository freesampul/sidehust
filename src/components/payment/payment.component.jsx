import React, { useState } from 'react';
import { getCheckoutUrl } from "../../utils/firebase/firebase.utils";
import { firebaseApp, validateUserSubscription } from "../../utils/firebase/firebase.utils"; // Ensure you export `firebaseApp`

const Payment = () => {
    const [selectedTier, setSelectedTier] = useState("Tier 1");

    const handleTierChange = (event) => {
        setSelectedTier(event.target.value);
    };

    const handlePayment = async () => {
        try {
            let priceId = "";
            if (selectedTier === "Tier 1") {
                priceId = "price_1OmQHjDT4vO9oNMHBjPblk38";
            } if (selectedTier === "Tier 2") {
                priceId = "price_1OpCHnDT4vO9oNMHnIF0Lerl";
            } else if (selectedTier === "Tier 3") {
                priceId = "price_1OpCdQDT4vO9oNMHTokejJyw";
            }
            const url = await getCheckoutUrl(firebaseApp, priceId);
            window.location.href = url;
            console.log("Checkout URL", url);
        } catch (error) {
            console.log("Error getting checkout URL", error);
        }
    };

    // const printStatus = async () => {
    //     try {
    //         const status = await getPremiumStatusAndUpdatePoints(firebaseApp);
    //         console.log("Premium status", status);
    //     } catch (error) {
    //         console.log("Error getting premium status", error);
    //     }
    // }

    const validateUser = async () => {
        validateUserSubscription(firebaseApp, "userId");
    }

    return (
        <div>
            <h1>Payment</h1>
            <select value={selectedTier} onChange={handleTierChange}>
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Tier 3">Tier 3</option>
            </select>
            <button onClick={handlePayment}>Pay</button>
            <button onClick={validateUser}>Status</button>
        </div>
        
    );
}

export default Payment;
