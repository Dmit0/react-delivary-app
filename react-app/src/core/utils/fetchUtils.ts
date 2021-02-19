import { Code } from '../enums';
import { AuthenticationApi } from '../api/apis/authentication.api';

export const FetchUtils = {
  async catchFetchErrors(error: any, token: string, callback?: any, data?: any) {
    switch (error) {
      case Code.Unauthorized:
        const refreshedToken = await AuthenticationApi.refreshToken(token);
        if (callback) {
          return refreshedToken && await callback(refreshedToken, data);
        }
        return refreshedToken;
      case Code.Forbidden:
        return error
      default:
        return false; //TODO: `rework solution of refresh token to each method`
    }
  },
};

