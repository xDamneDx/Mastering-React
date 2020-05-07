import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiURL } from '../config.json';

const apiEndpoint = `${apiURL}/auth`;
const tokenKey = 'token';

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
