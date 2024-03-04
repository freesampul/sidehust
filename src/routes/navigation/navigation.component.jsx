import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/users.context";
import { useEffect } from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const userName = currentUser ? currentUser.displayName : null;

  //Check if currentUser changes, update userName if so
  useEffect(() => {
    if(currentUser) {
      setCurrentUser(currentUser);
    }
  }, [currentUser, setCurrentUser]);

  return (
    <Fragment>
      <div className="navigation flex flex-col md:flex-row items-center justify-between bg-red-200 text-black p-4">
        <Link className="flex items-center justify-center md:justify-start" to='/'>
          <CrwnLogo className="w-8 h-8 mr-2" />
          <span className="text-lg font-bold">Your Brand</span>
        </Link>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <Link className='nav-link md:mr-4 mb-2 md:mb-0' to="/chat">Generate Ideas</Link>
          <Link className='nav-link md:mr-4 mb-2 md:mb-0' to="/checkout">Pricing</Link>
          <Link className='nav-link md:mr-4 mb-2 md:mb-0' to="/chat">Sugma</Link>
          {currentUser ? (
            <Link className='nav-link' to={`/user/${userName}`}>Hi {userName}</Link>
          ) : (
            <Link className='nav-link' to="/auth">Sign In</Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
