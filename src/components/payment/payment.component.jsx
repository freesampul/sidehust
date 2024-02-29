import { getCheckoutUrl } from "../../utils/firebase/firebase.utils";
import { firebaseApp } from "../../utils/firebase/firebase.utils"; // Ensure you export `firebaseApp`


const Payment = () => {
    const priceId = "price_1OmQHjDT4vO9oNMHBjPblk38";

    const fetchCheckoutUrl = async () => { 
        try {
            const url = await getCheckoutUrl(firebaseApp, priceId);
            window.location.href = url; 
            console.log("Checkout URL", url);
        }
        catch (error) {
            console.log("Error getting checkout URL", error);
        }
    };
    return (
        <div>
            <h1>Payment</h1>
            <button onClick={fetchCheckoutUrl}>Pay</button>
        </div>
    );
}

export default Payment;