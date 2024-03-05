import { Outlet } from 'react-router-dom';
import './home.styles.css';

const Home = () => {
  return (
    <>
      <div className="h-screen overflow-hidden relative">
        <div className="h-screen bg-gradient-to-b from-red-100 to-white absolute top-0 left-0 right-0"></div>
        <div className="flex flex-col items-center justify-center h-screen relative">
          <Outlet />
          <div className="max-w-lg px-4">
            {/* <div className="max-w-sm mx-auto bg-white text-red-600 rounded-lg p-4 mb-4 text-center absolute top-0 left-0 right-0 z-10 mt-20">
              <p className="font-semibold">Start Your Journey for Free!</p>
            </div> */}
            <h1 className="text-4xl lg:text-7xl font-bold text-center mb-8 mt-[-19rem]">Unlock Your Startup Potential</h1>
            <p className="text-lg text-center">Discover the secrets to spotting opportunities, building a successful business, and capitalizing on profits.</p>
          </div>
        </div>
      </div>
      <div className="h-screen overflow-hidden relative">
        <section className="h-screen bg-gray-500 absolute bottom-0 left-0 right-0">
          <script defer src="home.js"></script>

        </section>
      </div>
    </>
  );
};

export default Home;
