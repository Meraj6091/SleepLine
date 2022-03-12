import {apiEndPoint} from '../../../ApiEndPoints';
import axios from 'axios';

export const saveSleepTime = (data) => {
  return axios.post(`${apiEndPoint()}/app/createSleepTime`, data);
};

export const getAllSleepInfo = (data) => {
  return axios.post(`${apiEndPoint()}/app/getAllSleepInfo`, data);
};
