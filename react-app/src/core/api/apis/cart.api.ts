import { Action } from '../../enums';
import { restaurant, meals } from '../../types';
import { axiosHttp } from '../api';

export const cartApi = {
  async getUserCart() {
     const response = await axiosHttp<{ restaurants: restaurant[], meals: { meal: meals, count: number, restaurant: string }[] }>('/cart/getCart', 'GET');
     const { restaurants, meals } = response
      return {
        restaurants,
        meals: meals.map(item => ({...item.meal, count: item.count, restaurant: item.restaurant}))
      }
  },

  async setMealToUserCart(mealId: string) {
      return await axiosHttp<{ data: { price: any, meals: string[] }}>('/cart/setItemInCart', 'POST', JSON.stringify({ mealId }), {
        'Content-Type': 'application/json;charset=utf-8',
      });
  },

  async changeItemInCart(data: { action: Action, mealId: string }) {
      return await axiosHttp<{ status: boolean }>('/cart/changeItemInCart', 'POST', JSON.stringify(data), {
        'Content-Type': 'application/json;charset=utf-8',
      });
  },

  async deleteItemFromCart(mealId: string) {
      return await axiosHttp<{ status: boolean }>('/cart/deleteMealFromCart', 'POST', JSON.stringify({ mealId }), {
        'Content-Type': 'application/json;charset=utf-8',
      });
  },

  async cleanCart() {
      return await axiosHttp<{ status: boolean }>('/cart/cleanCart', 'POST');
  }
}