import {apiEndPoint} from '../../ApiEndPoints';
import axios from 'axios';

export const logedIn = data => {
  return axios.post(`${apiEndPoint()}/app/logIn`, data);
};
