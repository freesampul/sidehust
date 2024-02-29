import { Navigate } from "react-router-dom";
import { getCheckoutUrl } from "../../utils/firebase/firebase.utils";

const Payment = () => {
    const priceId = "price_1OmQHjDT4vO9oNMHBjPblk38"
    const getCheckoutUrl = async () => { 
        try {
            const url = await getCheckoutUrl(priceId);
            Navigate(url);
            console.log("Checkout URL", url);
        }
        catch (error) {
            console.log("Error getting checkout URL", error);
        }
    }
 
    return (
        <div>
        <h1>Payment</h1>
        </div>
    );
    }

export default Payment;