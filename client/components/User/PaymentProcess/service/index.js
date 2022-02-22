import axios from 'axios';
import {apiEndPoint} from '../../../ApiEndPoints';

export const docChannel = (data) => {
  return axios.post(`${apiEndPoint()}/app/docChannel`, data);
};
