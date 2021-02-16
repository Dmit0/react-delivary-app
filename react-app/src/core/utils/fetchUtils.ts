import { code } from '../enums';
import { AuthenticationApi } from '../api/apis/authentication.api';

export const FetchUtils = {
  async catchFetchErrors(error: any, token: string, callback?: any, data?: any) {
    switch (error) {
      case code.Unauthorized:
        const refreshedToken = await AuthenticationApi.refreshToken(token);
        if (callback) {
          return refreshedToken && await callback(refreshedToken, data);
        }
        return refreshedToken;
      default:
        return false; //TODO: `rework solution of refresh token to each method`
    }
  },
};

