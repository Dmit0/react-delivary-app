import { country } from '../../types';
import { axiosHttp } from '../api';


export const countriesAPI = {
  async get() {
    return await axiosHttp<country[]>('/country/get');
  },
};