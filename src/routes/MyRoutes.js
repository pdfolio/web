import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Template from './Template';
import Mypage from '../components/mypage/Mypage';
import Oauth2Process from '../components/login/Oauth2Process';
import SignupPage from '../components/login/SignupPage';
import ProjectWrite from '../components/wrtie/ProjectWrite';
import GatherWrite from '../components/wrtie/GatherWrite';
import GatherDetail from '../components/detail/GatherDetail';
import GatherMain from '../components/gather/GatherMain';
import ProjectDetail from '../components/detail/ProjectDetail';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage" element={<Mypage />} />

        <Route path="/project/write" element={<ProjectWrite />} />
        <Route path="/gather/write" element={<GatherWrite />} />

        <Route path="/gather/:id" element={<GatherDetail />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/gather" element={<GatherMain />} />
      </Route>
      <Route path="/callback/login" element={<Oauth2Process />} />
    </Routes>
  );
};

export default MyRoutes;
