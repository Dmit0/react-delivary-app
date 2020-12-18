import { bunner } from '../../interfaces/bunner';
import { http } from '../api';

export const UserAPI = {
  async getUser(token: string) {
    try {
      return await http<{ status: string }>('/user/getUser', 'GET', null, {
        Authorization: `Bearer ${ token }`,
      });
    } catch(e) {
      return false
    }
  },
};