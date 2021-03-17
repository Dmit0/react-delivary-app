import { IAddAddress, IHoleAddress, IUpdateAddress } from '../../types';
import { axiosHttp } from '../api';

export const AddressApi = {

  async addAddress(address: IAddAddress): Promise<any> {
    return await axiosHttp<{ address: IHoleAddress }>('/user/addAddress', 'POST', JSON.stringify({ address }), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },

  async deleteAddress(addressId: string): Promise<any> {
    return await axiosHttp<{ status: boolean }>('/user/deleteAddress', 'POST', JSON.stringify({ addressId }), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },

  async updateAddress(address: IUpdateAddress): Promise<any> {
    return await axiosHttp<{ status: boolean }>('/user/updateAddress', 'POST', JSON.stringify({ updateAddress: address }), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },

  async getPaginatedAddresses(paginatedData?: { offset?: number, size?: number }) {
    return await axiosHttp<{ addresses: IHoleAddress[], total: number }>('/address/getPaginatedAddresses', 'POST', JSON.stringify({ paginatedData }), {
      'Content-Type': 'application/json;charset=utf-8',
    });
  },
}