import { banner } from '../../types';
import { http } from '../api';

export const AppAPI = {
  async get() {
    return await http<banner[]>('banners/getBanners');
  },
};