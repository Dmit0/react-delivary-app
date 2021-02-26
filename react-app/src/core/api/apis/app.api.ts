import { banner } from '../../types';
import { axiosHttp } from '../api';

export const AppApi = {
  async get() {
    return await axiosHttp<banner[]>('banners/getBanners');
  },
};