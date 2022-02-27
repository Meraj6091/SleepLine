import axios from 'axios';
import {apiEndPoint} from '../../ApiEndPoints';

export const createUserProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/userCreateProfile`, data);
};

export const getAllUserInfo = (data) => {
  return axios.post(`${apiEndPoint()}/app/getUserInfo`, data);
};

export const getAllDocInfo = (data) => {
  return axios.post(`${apiEndPoint()}/app/getAllDocPofiles`, data);
};

export const isChanneled = (data) => {
  return axios.post(`${apiEndPoint()}/app/isChanneled`, data);
};

export const getUserMedicalRecord = (data) => {
  return axios.post(`${apiEndPoint()}/app/getUserMedicalRecord`, data);
};
