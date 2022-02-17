import axios from 'axios';
import {apiEndPoint} from '../../ApiEndPoints';

export const createDocProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/docCreateProfile`, data);
};

export const getAllDocInfo = (data) => {
  return axios.post(`${apiEndPoint()}/app/getAllDocInfo`, data);
};
