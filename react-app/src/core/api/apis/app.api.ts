import { banner } from '../../types';
import { http } from '../api';

export const AppApi = {
  async get() {
    return await http<banner[]>('banners/getBanners');
  },
};