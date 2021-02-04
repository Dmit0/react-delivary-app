import { IUpdateUser } from '../../types';
import { http } from '../api';
import { FetchUtils } from '../../utils/fetchUtils';

export const UserApi = {

  async getUser(token: string): Promise<any> {
    try {
      return await http<{ phone: any, addresses: any, user: any, role: any }>('/user/getUser', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });
    } catch (e) {
      return false
    }
  },

  async loveRestaurantAction(token: string, data: { restaurantId: string, action: boolean }): Promise<any> {
    try {
      return await http<{ status: boolean }>('/user/setLovedAction', 'POST', JSON.stringify(data), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
    } catch (e) {
      return await FetchUtils.catchFetchErrors(e, token, this.loveRestaurantAction, data)
    }
  },

  async updateUser(token: string, updateUser: IUpdateUser): Promise<any> {
    try {
      return await http<{ status: boolean }>('/user/updateUser', "POST", JSON.stringify(updateUser), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      })
    }catch(e) {
      return await FetchUtils.catchFetchErrors(e, token, this.updateUser, updateUser)
    }
  },

  async verifyMailKey(email: string): Promise<any> {
    try {
      return await http<{ status: boolean }>('/authentication/verifyMail', "POST", JSON.stringify({ email }), {
        'Content-Type': 'application/json'
      } )
    }catch(e) {
      return false
    }
  },
};