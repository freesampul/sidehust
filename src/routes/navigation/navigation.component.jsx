import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/users.context";
import { useEffect } from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userName = currentUser ? currentUser.displayName : null;

  // Check if currentUser changes, update userName if so
  useEffect(() => {
    if(currentUser) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  return (
    <Fragment>
      <div className="navigation bg-red-100 text-black p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link className="flex items-center" to='/'>
            <CrwnLogo className="w-8 h-8 mr-2 ml-4" /> {/* Adjusted margin here */}
            <span className="text-lg font-bold">Your Brand</span>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center ml-[-10re"> {/* Adjusted margin here */}
            <Link className='nav-link mx-2' to="/chat">Generate Ideas</Link>
            <Link className='nav-link mx-2' to="/checkout">Pricing</Link>
            <Link className='nav-link mx-2' to="/chat">Sugma</Link>
            {currentUser ? (
              <Link className='nav-link mx-2' to={`/user/${userName}`}>Hi {userName}</Link>
            ) : (
              <Link className='nav-link mx-2' to="/auth">Sign In</Link>
            )}
          </div>
        </div>
        <div></div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
