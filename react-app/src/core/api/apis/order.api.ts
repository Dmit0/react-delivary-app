import { axiosHttp } from '../api';

export const OrderAPI = {
  async order(data: any) {
      return await axiosHttp<{ status: boolean }>('order/makeOrder', 'POST', JSON.stringify(data), {
        'Content-Type': 'application/json;charset=utf-8',
      });
  },

  async checkOrderPermission() {
    return await axiosHttp<{ permission: boolean }>('order/checkOrderPermission');
  },
};