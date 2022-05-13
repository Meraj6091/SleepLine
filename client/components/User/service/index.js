import axios from 'axios';
import {apiEndPoint, flask_Api} from '../../ApiEndPoints';

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

export const updateProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/updateProfile`, data);
};

export const saveInsomniaLevelInToProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/saveInsomniaLevelInToProfile`, data);
};

export const getPrediction = (data) => {
  return axios.post(`${flask_Api()}/therepies`, data);
};
