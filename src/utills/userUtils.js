import React from 'react';

export const loginSuccessHandler = (me, setState) => {
  setState(true);
  localStorage.setItem('loginInfo', JSON.stringify(me));
};

export const logout = (setState) => {
  setState(false);
  localStorage.clear();
};
