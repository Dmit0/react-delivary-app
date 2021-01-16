import { FetchUtils } from '../../utils/fetchUtils';
import { http } from '../api';

export const OrderAPI = {
  async order(token: string, data: any) {
    try {
      return await http<{ status: boolean }>('order/makeOrder', 'POST', JSON.stringify(data), {
        Authorization: `Bearer ${ token }`,
        'Content-Type': 'application/json;charset=utf-8',
      });
    } catch (e) {
      return await FetchUtils.catchFetchErrors(e, token, this.order, data)
    }
  },
};