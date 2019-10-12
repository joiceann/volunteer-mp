import axios from 'axios';
import * as Constants from './constants';

const instance = axios.create({
  baseURL: Constants.BASE_URL,
  timeout: 2000,
});

export const setAuth = (token) => {
  instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  instance.defaults.headers.common['auth-token'] = token;
};


export default instance;
