import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Template from './Template';
import Mypage from '../components/mypage/Mypage';
import Oauth2Process from '../components/login/Oauth2Process';
import SignupPage from '../components/login/SignupPage';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" />
        <Route path="/mypage" element={<Mypage />} />
      </Route>
      <Route path="/callback/login" element={<Oauth2Process />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default MyRoutes;
