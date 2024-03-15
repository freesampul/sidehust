import React from 'react';
import './loading.styles.css';

const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default LoadingSpinner;
