import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './home.styles.css';
import Testimonials from '../../components/testimonials/testimonials.component';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded to true after a short delay to simulate loading
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  const getStarted = () => {
    navigate('/lessons');
  }

  return (
    <>
      <div className="h-screen overflow-hidden relative">
        <div className="h-screen bg-gradient-to-b from-red-50 to-white-100 absolute top-0 left-0 right-0"></div>
        <div className="flex flex-col items-center justify-center h-screen relative">
          <Outlet />
          <div className={`max-w-lg w-full px-4 ${loaded ? 'fade-in' : ''}`}>
            {/* <div className="max-w-sm mx-auto bg-white text-red-600 rounded-lg p-4 mb-4 text-center absolute top-0 left-0 right-0 z-10 mt-20">
              <p className="font-semibold">Start Your Journey for Free!</p>
            </div> */}
            <h1 className={`text-4xl lg:text-7xl font-bold text-center mb-8 mt-[-300px] ${loaded ? 'fade-in' : ''}`}>Unlock Your Startup's Potential</h1>
            <p className={`text-lg text-center ${loaded ? 'fade-in' : ''}`}>Discover the secrets to spotting opportunities, building a successful business, and capitalizing on profits.</p>
            <div className="flex justify-center"> {/* Add this wrapper div */}
    <button onClick={getStarted}className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 ${loaded ? 'fade-in' : ''}`}>Get Started</button>
  </div>          </div>
        </div>
      </div>
      <div className="h-screen overflow-hidden relative">
        <section className="h-screen bg-gray-500 absolute bottom-0 left-0 right-0">
          <script defer src="home.js"></script>
          <Testimonials />
        </section>
      </div>
    </>
  );
};

export default Home;
