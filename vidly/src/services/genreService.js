import http from './httpService';
import { apiURL } from '../config.json';

export const getGenres = () => {
  return http.get(`${apiURL}/genres`);
};
