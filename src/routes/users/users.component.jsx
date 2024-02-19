
import { Routes, Route } from 'react-router-dom';
import UserPreview from '../../components/user-preview/user-preview.component';
import Profile from '../profile/profile.component';


const UserPage = () => {
  return (
    <Routes>
      <Route index element={<UserPreview />} />
      <Route path=':user' element={<Profile />} />
     </Routes>
  );
};

export default UserPage;