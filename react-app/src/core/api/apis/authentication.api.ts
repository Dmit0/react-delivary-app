import { Address, addressDataStep, loginData } from '../../types';
import { getLocaleStorageItem } from '../../utils/locale-storage.utils';
import { axiosHttp } from '../api';

export const AuthenticationApi = {
    async createAccount(user: any) {
        return await axiosHttp<boolean>('/authentication/SignUp', 'POST', JSON.stringify(user), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },
    async verifyMail(email: string) {
        return await axiosHttp<boolean>('/authentication/verifyMail', 'POST', JSON.stringify({ email }), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },

    async verifyPhone(phone: { code: string, number: string }) {
        return await axiosHttp<boolean>('/authentication/verifyPhone', 'POST', JSON.stringify(phone), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },

    async logIn(data: loginData) {
        return await axiosHttp<{
            token: string,
            email: string,
            firstName: string,
            phone: string,
            firstAddress: Address,
            id: string,
            cart: number
        }>('/authentication/signIn', 'POST', JSON.stringify(data), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },

    async addAddressStep(data: addressDataStep) {
        return await axiosHttp<{ status: boolean }>('/authentication/signUpStep3', 'POST', JSON.stringify(data), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },

    async getLoveUserRestaurants(token: any): Promise<any> {
        return await axiosHttp<string[]>('user/getLoveRestaurant', 'GET', null, {});
    },

    async validateToken() {
        const tokenStatus = await axiosHttp<{ status: string }>('/authentication/checkToken');
        return tokenStatus?.status && getLocaleStorageItem('token');
    },

    async refreshToken(token: string) {
        const response = await axiosHttp<{ token: string }>('/authentication/refreshToken', 'POST', JSON.stringify({ token }), {
            'Content-Type': 'application/json;charset=utf-8',
        });
        return response.token;
    },
};