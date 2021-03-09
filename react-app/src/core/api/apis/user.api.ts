import { IUpdateUser } from '../../types';
import { axiosHttp } from '../api';

export const UserApi = {

  async getUser(): Promise<any> {
    return await axiosHttp<{ phone: any, addresses: any, user: any, role: any }>('/user/getUser');
  },

  async loveRestaurantAction(data: { restaurantId: string, action: boolean }): Promise<any> {
    return await axiosHttp<{ status: boolean }>('/user/setLovedAction', 'POST', JSON.stringify(data), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },

  async updateUser(updateUser: IUpdateUser): Promise<any> {
    return await axiosHttp<{ status: boolean }>('/user/updateUser', 'POST', JSON.stringify(updateUser), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },
};