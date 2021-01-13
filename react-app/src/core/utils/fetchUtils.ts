import { code } from '../enums';
import { AuthenticationAPI } from '../api/apis/authenticationApi';

export const FetchUtils = {
  async catchFetchErrors(error: any, token: string, callback?: any, data?: any) {
    switch (error) {
      case code.Unauthorized:
        const refreshedToken = await AuthenticationAPI.refreshToken(token);
        if (callback) {
          return refreshedToken && await callback(refreshedToken, data);
        }
        return refreshedToken;
      default:
        return error;
    }
  },
};

