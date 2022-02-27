import axios from 'axios';
import {apiEndPoint} from '../../../ApiEndPoints';

export const crateMedicalRecords = (data) => {
  return axios.post(`${apiEndPoint()}/app/crateMedicalRecords`, data);
};

export const getUserMedicalRecords = (data) => {
  return axios.post(`${apiEndPoint()}/app/getUserMedicalRecords`, data);
};
export const updateMedicalRecord = (data) => {
  return axios.post(`${apiEndPoint()}/app/updateMedicalRecord`, data);
};
export const deleMedicalRecord = (data) => {
  return axios.post(`${apiEndPoint()}/app/deleMedicalRecord`, data);
};
