export const loginSuccessHandler = (me) => {
  localStorage.setItem('loginInfo', JSON.stringify(me));
};
