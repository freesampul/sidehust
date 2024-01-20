import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {


  return(
  <div>
    <Outlet />
    <h1>Home page</h1>
  </div>
  )
};

export default Home;