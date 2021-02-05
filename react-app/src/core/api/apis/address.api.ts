import { IAddAddress } from '../../types';
import { FetchUtils } from '../../utils/fetchUtils';
import { http } from '../api';

export const AddressApi = {

  async addAddress(token: string, address: IAddAddress): Promise<any> {
    try {
      return await http<{ address: any }>('/user/addAddress', 'POST', JSON.stringify({ address }), {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ token }`,
      });
    } catch (e) {
      return await FetchUtils.catchFetchErrors(e, token, this.addAddress, address)
    }
  },

  async deleteAddress(token: string, addressId: string): Promise<any> {
    try {
      return await http<{ status: boolean }>('/user/deleteAddress', 'POST', JSON.stringify({ addressId }), {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${ token }`,
      });
    } catch (e) {
      return await FetchUtils.catchFetchErrors(e, token, this.addAddress, addressId)
    }
  },
}