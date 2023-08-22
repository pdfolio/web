import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Template from './Template';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
