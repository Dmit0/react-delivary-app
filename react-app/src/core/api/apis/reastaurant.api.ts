import { CuisineResponseType, restaurant } from '../../types';
import { axiosHttp } from '../api';

export const restaurantAPI = {
  async get() {
    return await axiosHttp<restaurant[]>('restaurants/findAll');
  },
  async getCuisineTypes() {
    return await axiosHttp<CuisineResponseType>('cuisine/getCuisines');
  },
  async getRestaurants(ids: string[]) {
      return await axiosHttp<restaurant[]>('restaurants/findByIds', 'POST',JSON.stringify({ data: ids }), {
        'Content-Type': 'application/json;charset=utf-8',
      })
  }
};