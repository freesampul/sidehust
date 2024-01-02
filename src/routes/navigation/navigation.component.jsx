import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/users.context";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () =>{
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

    return(
      <Fragment>
        <div className="navigation">
            <Link className="logo-container" to='/'>
            <CrwnLogo className="logo" />
            </Link>
            <div className="nav-links-container">
                <Link className='nav-link' to="/shop">Shop</Link>
                {
                  currentUser ? (
                    <span className="nav-link" onClick={signOutHandler}>Sign out</span>)
                    : (<Link className='nav-link' to="/auth">Sign In</Link>
                  )}
            </div>   
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;    