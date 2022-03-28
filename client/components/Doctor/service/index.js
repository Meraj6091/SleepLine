import axios from 'axios';
import {apiEndPoint} from '../../ApiEndPoints';

export const createDocProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/docCreateProfile`, data);
};

export const getAllDocInfo = (data) => {
  return axios.post(`${apiEndPoint()}/app/getAllDocInfo`, data);
};

export const getAllDoctorMedicalRecords = (data) => {
  return axios.post(`${apiEndPoint()}/app/getAllDoctorMedicalRecords`, data);
};

export const updateProfile = (data) => {
  return axios.post(`${apiEndPoint()}/app/updateDocProfile`, data);
};
