import {apiEndPoint} from '../../ApiEndPoints';
import axios from 'axios';

export const createUserAccount = data => {
  return axios.post(`${apiEndPoint()}/app/signupUser`, data);
};

export const createDocAccount = data => {
  return axios.post(`${apiEndPoint()}/app/signupDoc`, data);
};
