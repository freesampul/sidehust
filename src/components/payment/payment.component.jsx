import React, { useState, useContext } from 'react';
import { getCheckoutUrl } from "../../utils/firebase/firebase.utils";
import { firebaseApp } from "../../utils/firebase/firebase.utils";
import LoadingSpinner from '../loading/loading.component';
import { UserContext } from '../../contexts/users.context';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const { currentUser } = useContext(UserContext);


    const handlePayment = async (selectedTier) => {
        if (!currentUser) {
            alert("Please sign in to continue");
            return;
        }
        setLoading(true); 
        let priceId = null;
        try {
            switch (selectedTier) {
                case "Free":
                    break;
                case "Idk":
                    priceId = "price_1Os5dHDT4vO9oNMHgZ4gCjy3";
                    break; 
                case "Pro":
                    priceId = "price_1Os5dHDT4vO9oNMHgZ4gCjy3";
                    break; 
                default:
                    break;
            }
            const url = await getCheckoutUrl(firebaseApp, priceId);
            window.location.href = url;
            console.log("Checkout URL", url);
        } catch (error) {
            console.log("Error getting checkout URL", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-b from-red-50 to-white-100">
            {loading && <LoadingSpinner />} {/* Render loading spinner if loading state is true */}
            <div className="flex flex-col items-center justify-center h-full">
                <div className="hidden lg:block max-w-lg px-4">
                    <h1 className="text-3xl md:text-6xl font-bold text-center mb-4 md:mt-[10]">Plans for everyone.</h1>
                    <p className="text-sm md:text-lg text-center mb-4">Start learning today for completely free</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-3 mx-auto w-full md:w-4/5 p-4">
                    <div className="bg-gray-200 rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-2">Basic</h2>
                        <h2 className="text-2xl font-bold mb-2">Free</h2>
                        <h3 className="text-sm font-bold mb-2 text-gray-600">0 tokens</h3>
                        <p className="text-sm mb-2">Access to two courses</p>
                        <p className="text-sm mb-2">Earn tokens by helping other users</p>
                        <p className="text-sm mb-2">Limited access to AI tools & money makers</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Free</button>
                    </div>
                    <div className="bg-red-500 text-white rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-2">Idk</h2>
                        <h2 className="text-2xl font-bold mb-2">$2/month</h2>
                        <h3 className="text-sm font-bold mb-2 text-black">100 tokens</h3>
                        <p className="text-sm mb-2">Access to all courses</p>
                        <p className="text-sm mb-2">Full access to AI tools</p>
                        <p className="text-sm mb-2">Explore money-making guides and start earning</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => handlePayment("Idk")}>Upgrade</button>
                    </div>
                    <div className="bg-gray-200 rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-2">Pro</h2>
                        <h2 className="text-2xl font-bold mb-2">$5/month</h2>
                        <h3 className="text-sm font-bold mb-2 text-gray-600">250 tokens</h3>
                        <p className="text-sm mb-2">Access to all courses</p>
                        <p className="text-sm mb-2">Full access to AI tools</p>
                        <p className="text-sm mb-2">Explore money-making guides and start earning</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => handlePayment("Pro")}>Upgrade</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
