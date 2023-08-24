import React from 'react';

export const loginSuccessHandler = (me, setState) => {
  setState({ isLogin: true, info: me.loginInfo });
  localStorage.setItem('loginInfo', JSON.stringify(me));
};

export const logout = (setState) => {
  setState({ isLogin: false, me: {} });
  localStorage.clear();
};
