import { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/users.context';

import { Routes, Route } from 'react-router-dom';
import UserPreview from '../../components/user-preview/user-preview.component';
import Profile from '../../components/profile/profile.component';


const UserPage = () => {
    const { currentUser } = useContext(UserContext);

  return (
    <Routes>
      <Route index element={<UserPreview />} />
      <Route path=':user' element={<Profile />} />
     </Routes>
  );
};

export default UserPage;