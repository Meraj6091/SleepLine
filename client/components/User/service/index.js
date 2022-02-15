import axios from 'axios';
import {apiEndPoint} from '../../ApiEndPoints';

export const createUserProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/userCreateProfile`, data);
};

export const getAllUserInfo = (data) => {
  debugger;
  return axios.post(`${apiEndPoint()}/app/getUserInfo`, data);
};
