import { http } from './api';
import { bunner } from '../interfaces/bunner';

export const AppAPI = {
  async get() {
    return await http<bunner[]>('banners/getBanners');
  },
};