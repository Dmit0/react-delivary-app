import { AuthenticationAPI } from '../part_apis/authenticationApi';

export enum Code {
  'Unauthorized' = '401'
}

export const FetchUtils = {
  async catchFetchErrors(error: any, token: string, callback?: any, data?: any) {
    switch (error) {
      case Code.Unauthorized:
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

