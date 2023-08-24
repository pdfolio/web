import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.0.203:8080';

export const memberApi = async (url, method, data) => {
  const { loginInfo, token } = JSON.parse(localStorage.getItem('loginInfo'));
  const body = await axios({
    url,
    method,
    data,
    headers: { Authorization: `Bearer ${token.accessToken}` },
  });
  return body.data;
};
