import { MealsResponseType } from '../../types';
import { http } from '../api';

export const MealAPI = {
  async get(_id: string, isRequestFromMealsPage = false) {
    return await http<MealsResponseType>(isRequestFromMealsPage ? `/meal/getMeals/${_id}` : `meal/getMeals/${_id}`);
  },
};