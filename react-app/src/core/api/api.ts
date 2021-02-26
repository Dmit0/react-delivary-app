import axios, { Method } from 'axios'
import { ErrorsCode } from '../enums';
import { Core } from '../enums/core.enum';
import { ExceptionRapidHeader } from '../enums/exception-headers.enum';
import { getLocaleStorageItem, setLocaleStorageItem } from '../utils/locale-storage.utils';
import { AuthenticationApi } from './apis/authentication.api';

export async function axiosHttp <T>(request: string, method: Method = 'GET', data?: any, headers: HeadersInit = {}, params?: any): Promise<T> {
    try {
        const response =  await axios({
            url: request,
            method,
            data,
            headers,
            params
        });
        return response.data
    } catch (error) {
        console.error(error);
        throw error.message
    }
}

axios.interceptors.request.use((request) => {
    if (Object.keys(request.headers).includes(ExceptionRapidHeader)) {
        return request
    }
    return {
        ...request,
        headers: {
            ...request.headers,
            'Authorization': `Bearer ${getLocaleStorageItem(Core.Token)}`
        }
    }
});

axios.interceptors.response.use((response) => { return response }, async (error) => {
    const { response } = error;
    switch (response.status) {
        case ErrorsCode.Unauthorized:
            const refreshedToken = !getLocaleStorageItem(Core.RefreshTokenError) && await AuthenticationApi.refreshToken(getLocaleStorageItem('token'));
            if (refreshedToken) {
                setLocaleStorageItem(Core.Token, refreshedToken);
                setLocaleStorageItem(Core.RefreshTokenError, false);
                return axios.request(response.config);
            } else {
                setLocaleStorageItem(Core.RefreshTokenError, true);
                return error
            }
        default: return error
    }
});

