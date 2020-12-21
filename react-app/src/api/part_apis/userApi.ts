import { http } from '../api';
import { Code, FetchUtils } from '../utils/fetchUtils';
import { AuthenticationAPI } from './authenticationApi';

export const UserAPI = {

  async getUser(token: string): Promise<any> {
    try {
      return await http<{ phone: any, addresses: any, _doc: any }>('/user/getUser', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });
    } catch (e) {
      return false
    }
  },

  async loveRestaurantAction(token: string, data: { restaurantId: string, action: boolean }): Promise<any> {
    try {
      const res = await http<{ status: boolean }>('/user/setLovedAction', 'POST', JSON.stringify(data), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
      return res;
    } catch (e) {
      return await FetchUtils.catchFetchErrors(e, token, this.loveRestaurantAction, data)
    }
  },
};