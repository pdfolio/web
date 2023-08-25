import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Template from './Template';
import Heart from '../components/heart/Heart';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />}>
        <Route path="/" element={<Heart />} />

      </Route>
    </Routes>
  );
};

export default MyRoutes;
