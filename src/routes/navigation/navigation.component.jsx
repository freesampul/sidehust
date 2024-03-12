import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../contexts/users.context";
import { useEffect } from "react";
import InfoBox from "../../components/info/info.component"; // Make sure the path is correct

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
      <div class="p-4 bg-red-50">
        <nav class="flex items-center justify-between bg-transparent">
          <div class="flex items-center">
            <span class="text-black text-lg font-semibold mr-2 ml-4">Logo</span>
          </div>
          <div class="flex items-center justify-center flex-grow mr-12">
            <div class="hidden lg:flex">
              <a href="/" class="text-black hover:text-gray-600 px-3 py-2">Home</a>
              <a href="/lessons" class="text-black hover:text-gray-600 px-3 py-2">Lessons</a>
              <a href="/checkout" class="text-black hover:text-gray-600 px-3 py-2">Pricing</a>
              <a href="/blog" class="text-black hover:text-gray-600 px-3 py-2">Blog</a>
            </div>
            <div class="lg:hidden ml-auto">
              <button id="menu-toggle" class="text-black-300 hover:text-gray-600 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <InfoBox />
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
