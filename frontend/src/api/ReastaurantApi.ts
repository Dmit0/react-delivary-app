import { restaurant, cuisen } from '../interfaces/restaurant';
import { meals } from '../interfaces/meals';
import { http } from './api';

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
    const response = await http<restaurant[]>('restaurants/findAll');
    return response;
  },
  async getCuisenTypes() {
    const response = await http<CuisenResponseType>('cuisine/getCuisines');
    return response;
  },
};

export const MealAPI = {
  async get(_id: string, isRequestFromMealsPage = false) {
    const response = await http<MealsResponseType>(isRequestFromMealsPage ? '/meal/getMeals' : 'meal/getMeals', 'POST', JSON.stringify({ _id }), {
      'Content-Type': 'application/json;charset=utf-8',
    });
    return response;
  },
};