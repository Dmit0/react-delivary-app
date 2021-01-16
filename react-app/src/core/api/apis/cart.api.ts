import { Action } from '../../enums';
import { restaurant, meals } from '../../types';
import { http } from '../api';
import { FetchUtils } from '../../utils/fetchUtils';

export const cartApi = {
  async getUserCart(token: string) {
    try {
     const response = await http<{ restaurants: restaurant[], meals: { meal: meals, count: number, restaurant: string }[] }>('/cart/getCart', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });
     const {restaurants, meals} = response
      return {
        restaurants,
        meals: meals.map(item => ({...item.meal, count: item.count, restaurant: item.restaurant}))
      }
    } catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.getUserCart)
    }
  },

  async setMealToUserCart(token: string, mealId: string) {
    try {
      return await http<{ data: { price: any, meals: string[] }}>('/cart/setItemInCart', 'POST', JSON.stringify({ mealId }), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
    } catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.setMealToUserCart, mealId)
    }
  },

  async changeItemInCart(token: string, data: { action: Action, mealId: string }) {
    try {
      return await http<{ status: boolean }>('/cart/changeItemInCart', 'POST', JSON.stringify(data), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
    } catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.changeItemInCart, data)
    }
  },

  async deleteItemFromCart(token: string, mealId: string) {
    try {
      return await http<{ status: boolean }>('/cart/deleteMealFromCart', 'POST', JSON.stringify({ mealId }), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
    } catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.setMealToUserCart, mealId)
    }
  },

  async cleanCart(token: string) {
    try {
      return await http<{ status: boolean }>('/cart/cleanCart', 'POST', null, {
        Authorization: `Bearer ${ token }`,
      });
    } catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.cleanCart)
    }
  }
}