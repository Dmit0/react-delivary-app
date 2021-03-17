import { MealsResponseType } from '../../types';
import { axiosHttp } from '../api';

export const MealAPI = {
  async get(_id: string, isRequestFromMealsPage = false) {
    return await axiosHttp<MealsResponseType>(
      `/meal/getMeals`,
      'GET',
      null,
      {},
      { id: _id });
  },
};