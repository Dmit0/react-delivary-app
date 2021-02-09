import { country } from '../../types';
import { http } from '../api';


export const countriesAPI = {
  async get() {
    return await http<country[]>('/country/get');
  },
};