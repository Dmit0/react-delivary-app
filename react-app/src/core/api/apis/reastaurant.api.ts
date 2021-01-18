import { CuisineResponseType, MealsResponseType, restaurant } from '../../types';
import { http } from '../api';

export const restaurantAPI = {
  async get() {
    return await http<restaurant[]>('restaurants/findAll');
  },
  async getCuisineTypes() {
    return await http<CuisineResponseType>('cuisine/getCuisines');
  },
  async getRestaurants(ids: string[]) {
      return await http<restaurant[]>('restaurants/findByIds', 'POST',JSON.stringify({data: ids}), {
        'Content-Type': 'application/json;charset=utf-8',
      })
  }
};