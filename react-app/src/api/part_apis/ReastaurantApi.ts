import { restaurant, cuisen } from '../../interfaces/restaurant';
import { meals } from '../../interfaces/meals';
import { http } from '../api';

// type RestaurantResponseType={
//     data:restaurant[],
// }

type MealsResponseType = {
  meals: meals[]
}

type CuisenResponseType = {
  cuisens: cuisen[]
}

export const restaurantAPI = {
  async get() {
    return await http<restaurant[]>('restaurants/findAll');
  },
  async getCuisenTypes() {
    return await http<CuisenResponseType>('cuisine/getCuisines');
  },
};

export const MealAPI = {
  async get(_id: string, isRequestFromMealsPage = false) {
    return await http<MealsResponseType>(isRequestFromMealsPage ? `/meal/getMeals/${_id}` : `meal/getMeals/${_id}`);
  },
};