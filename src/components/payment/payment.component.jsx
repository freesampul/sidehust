import React, { useState } from 'react';
import { getCheckoutUrl } from "../../utils/firebase/firebase.utils";
import { firebaseApp } from "../../utils/firebase/firebase.utils"; // Ensure you export `firebaseApp`

const Payment = () => {
    const [selectedTier, setSelectedTier] = useState("Tier 1");


    const handlePayment = async () => {
        try {
            let priceId = "";
            if (selectedTier === "Tier 1") {
                priceId = "price_1Os5dHDT4vO9oNMHgZ4gCjy3";
            } if (selectedTier === "Tier 2") {
                priceId = "price_1Os5dHDT4vO9oNMHgZ4gCjy3";
            }
            const url = await getCheckoutUrl(firebaseApp, priceId);
            window.location.href = url;
            console.log("Checkout URL", url);
        } catch (error) {
            console.log("Error getting checkout URL", error);
        }
    };

    return (
        <>
            <div className="h-screen relative">
                <div className="h-screen bg-gradient-to-b from-red-50 to-white-100 absolute top-0 left-0 right-0"></div>
                <div className="flex flex-col items-center justify-center h-screen relative">
                    <div className="max-w-lg px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Plans for everyone.</h1>
                        <p className="text-lg text-center">Start learning today for completely free</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 mt-8 mx-auto w-4/5 outline-gray-100 p-8 rounded-lg">
                        <div className="bg-gray-200 rounded-xl shadow-lg p-8">
                            <h2 className="text-xl font-bold mb-4">Basic</h2>
                            <h2 className="text-4xl font-bold mb-4">Free</h2>
                            <h3 className="text-sm font-bold mb-4 text-gray-600">0 tokens</h3>
                            <br></br>
                            <br></br>
                            <p className="text-md mb-4">Access to two courses</p>
                            <p className="text-md mb-4">Earn tokens by helping other users</p>
                            <p className="text-md mb-4">Limited access to ai tools & money makers</p>
                            <br></br>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Free</button>
                        </div>
                        <div className="bg-red-500 text-white rounded-xl shadow-lg p-8">
                            <h2 className="text-xl font-bold mb-4">Idk</h2>
                            <h2 className="text-4xl font-bold mb-4">$2/month</h2>
                            <h3 className="text-sm font-bold mb-4 text-black">100 tokens</h3>
                            <br></br>
                            <br></br>
                            <p className="text-md mb-4">Access to all courses</p>
                            <p className="text-md mb-4">Full access to ai tools</p>
                            <p className="text-md mb-4">Explore money making guides and start earning</p>
                            <br></br>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayment}>Upgrade</button>
                        </div>
                        <div className="bg-gray-200 rounded-xl shadow-lg p-8">
                            <h2 className="text-xl font-bold mb-4">Pro</h2>
                            <h2 className="text-4xl font-bold mb-4">$5/month</h2>
                            <h3 className="text-sm font-bold mb-4 text-gray-600">250 tokens</h3>
                            <br></br>
                            <br></br>
                            <p className="text-md mb-4">Access to all courses</p>
                            <p className="text-md mb-4">Full access to ai tools</p>
                            <p className="text-md mb-4">Explore money making guides and start earning</p>
                            <br></br>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePayment}>Upgrade</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
