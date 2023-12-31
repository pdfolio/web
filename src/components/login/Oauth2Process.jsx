import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { oauth2CheckApi, oauth2PostApi } from '../../networks/member/oauth2Api';
import { loginSuccessHandler } from '../../utills/userUtils';
import { isLogin } from '../../store/store';

const Oauth2Process = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigate();
  const { state, setState } = isLogin();

  const login = async (accessToken) => {
    try {
      const data = await oauth2PostApi(`/api/v1/oauth2/google/login`, 'POST', {
        accessToken,
      });
      console.log('------', data);
      loginSuccessHandler(data, setState);
    } catch (error) {
      alert('oauth2 login fail');
    }
    nav('/');
  };
  const signup = async (accessToken, providerName) => {
    sessionStorage.setItem(
      'signup',
      JSON.stringify({ providerName, accessToken }),
    );
    nav('/signup');
  };

  const checkStatus = async () => {
    try {
      const { isNewMember, accessToken, providerName } = await oauth2CheckApi(
        `/api/v1/oauth2/google/check?code=${searchParams.get('code')}`,
        'GET',
      );
      console.log({ isNewMember, accessToken, providerName });
      isNewMember ? signup(accessToken, providerName) : login(accessToken);
    } catch (error) {
      alert('check oauth2 fail');
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);
  return (
    <div>
      <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/b6e0b072897469.5bf6e79950d23.gif" />
    </div>
  );
};

export default Oauth2Process;
