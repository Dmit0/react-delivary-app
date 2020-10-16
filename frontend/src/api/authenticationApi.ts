import { http } from './api';

// interface User{

// }

export const AuthenticationAPI = {
  async createAccount(user: any) {
    const response = await http('authentication/signIn', 'POST', JSON.stringify(user), {
      'Content-Type': 'application/json;charset=utf-8',
    });
    return response;
  },
};