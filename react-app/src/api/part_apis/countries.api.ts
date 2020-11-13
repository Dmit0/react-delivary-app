import { country } from '../../interfaces/country';
// @ts-ignore
import { http } from '../api';


export const countriesAPI = {
  async get() {
    return await http<country[]>('country/get');
  },
};