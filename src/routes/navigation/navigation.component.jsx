import { Fragment, useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/users.context";
import InfoBox from "../../components/info/info.component";
import PhonePopUp from "../../components/phone-popup/phone-popup.component";
import { ReactComponent as CrwnLogo } from '../../assets/logo.svg';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [purchasedCoursesCount, setPurchasedCoursesCount] = useState(0); // New state for purchased courses count

  const userName = currentUser ? currentUser.displayName : null;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) {
      setIsPhonePopupOpen(false);
    }
  }, [windowWidth]);

  const togglePhonePopup = () => {
    setIsPhonePopupOpen(!isPhonePopupOpen);
  };

  // Function to update purchased courses count
  const updatePurchasedCoursesCount = () => {
    setPurchasedCoursesCount(prevCount => prevCount + 1);
  };

  // Function to handle closing the phone popup
  const handleClosePhonePopup = () => {
    setIsPhonePopupOpen(false);
  };

  return (
    <Fragment>
      <div className="p-4 bg-red-50">
        <nav className="flex items-center justify-between bg-transparent">
          <div className="flex items-center">
            <CrwnLogo className="h-8 w-8" />
            <span className="text-black text-lg font-semibold">Bizzy Blast</span>
          </div>
          <div className="flex items-center justify-center flex-grow mr-12 ml-[-60px]">
            <div className="hidden lg:flex">
              <Link to="/" className="text-black hover:text-gray-600 px-3 py-2">Home</Link>
              <Link to="/lessons" className="text-black hover:text-gray-600 px-3 py-2">Lessons</Link>
              <Link to="/checkout" className="text-black hover:text-gray-600 px-3 py-2">Pricing</Link>
              <Link to="/tools" className="text-black hover:text-gray-600 px-3 py-2">Tools</Link>
            </div>
            <div className="lg:hidden ml-auto">
              <button id="menu-toggle" onClick={togglePhonePopup} className="text-black-300 hover:text-gray-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        {/* Pass purchasedCoursesCount to InfoBox */}
        <InfoBox purchasedCoursesCount={purchasedCoursesCount} />
      </div>
      {windowWidth <= 1024 && isPhonePopupOpen && <PhonePopUp onClose={handleClosePhonePopup} />}
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
