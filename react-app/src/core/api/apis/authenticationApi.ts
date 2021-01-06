import { Address, addressDataStep, loginData } from '../../types';
import {http} from '../api'
import { FetchUtils } from '../../utils/fetchUtils';

export const AuthenticationAPI = {
    async createAccount(user: any) {
        try {
            return await http<boolean>('/authentication/SignUp', 'POST', JSON.stringify(user), {
                'Content-Type': 'application/json;charset=utf-8',
            });
        } catch (e) {
            return false;
        }
    },
    async verifyMail(email: string) {
        try {
            return await http<boolean>('/authentication/verifyMail', 'POST', JSON.stringify({ email }), {
                'Content-Type': 'application/json;charset=utf-8',
            });
        } catch (e) {
            return false;
        }
    },

    async logIn(data: loginData) {
        try {
            return await http<{
                token: string,
                email: string,
                firstName: string,
                phone: string,
                firstAddress: Address,
                id: string,
            }>('/authentication/signIn', 'POST', JSON.stringify(data), {
                'Content-Type': 'application/json;charset=utf-8',
            });
        } catch (e) {
            return false;
        }
    },

    async addAddressStep(data: addressDataStep) {
        try {
            return await http<{ status: boolean }>('/authentication/signUpStep3', 'POST', JSON.stringify(data), {
                'Content-Type': 'application/json;charset=utf-8',
            });
        } catch (e) {
            return false;
        }
    },

    async getLoveUserRestaurants(token: any): Promise<any>{
        try {
           return await http<string[]>('user/getLoveRestaurant','GET', null, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
            return false
       }
    },

    async validateToken(token: string) {
        try {
            const tokenStatus = await http<{ status: string }>('/authentication/checkToken', 'GET', null, {
                Authorization: `Bearer ${ token }`,
            });
            return tokenStatus.status && token
        } catch (e) {
            return await FetchUtils.catchFetchErrors(e, token)
        }
    },

    async refreshToken(token: string) {
        try {
            const response =  await http<{ token: string }>('/authentication/refreshToken', 'POST', JSON.stringify({ token }), {
                'Content-Type': 'application/json;charset=utf-8',
            });
            return response.token
        } catch (e) {
            return false;
        }
    },
};