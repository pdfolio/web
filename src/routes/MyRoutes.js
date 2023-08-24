import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Template from './Template';
import Mypage from '../components/mypage/Mypage';
import Oauth2Process from '../components/login/Oauth2Process';
import SignupPage from '../components/login/SignupPage';
import ProjectWrite from '../components/wrtie/ProjectWrite';
import GatherWrite from '../components/wrtie/GatherWrite';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" />
        <Route path="/project/write" element={<ProjectWrite />} />
        <Route path="/gather/write" element={<GatherWrite />} />
      </Route>
      <Route path="/callback/login" element={<Oauth2Process />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
};

export default MyRoutes;
