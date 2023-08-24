import axios from 'axios';
export const oauth2Uri = {
  github:
    'https://github.com/login/oauth/authorize?client_id=69aafb425ba181a01adb&scope=user:email&redirect_uri=http://localhost:3000/callback/login',
  kakao:
    'https://kauth.kakao.com/oauth/authorize?client_id=9fdf349057f6c49aca00886fac34706b&redirect_uri=http://localhost:3000/callback/login&response_type=code',
  google:
    'https://accounts.google.com/o/oauth2/v2/auth?scope=profile&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:3000/callback/login&client_id=461130101090-ajmueg6qnnsp7d8g6ec61q2jm6137kr0.apps.googleusercontent.com ',
};

export const oauth2CheckApi = async (url, method) => {
  const body = await axios({
    url,
    method,
  });
  return body.data;
};

export const oauth2PostApi = async (url, method, data) => {
  const body = await axios({
    url,
    method,
    data,
  });
  return body.data;
};

axios.defaults.baseURL = 'http://192.168.0.203:8080';
