
import { Routes, Route } from 'react-router-dom';
import LessonsPreview from '../../components/lessons-preview/lessons-preview.component';
import Profile from '../profile/profile.component';

const LessonsPage = () => {
  return (
    <Routes>
      <Route index element={<LessonsPreview />} />
      <Route path=':user' element={<Profile />} />
     </Routes>
  );
};

export default LessonsPage;