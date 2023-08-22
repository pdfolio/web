import React from 'react';
import { Outlet } from 'react-router-dom';
import MyFooter from './MyFooter';
import MyHeader from './MyHeader';

const Template = () => {
  return (
    <>
      <MyHeader />
      <Outlet />
      <MyFooter />
    </>
  );
};

export default Template;
