import { addressDataStep, loginData } from '../../interfaces/authentication';
import { restaurant as restaurantType } from '../../interfaces/restaurant';
import {http} from '../api'
import { Code } from '../utils/fetchUtils';

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
                firstAddress: string,
                id: string
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

    async getLoveUserRestaurants(token: any) {
        try {
           return await http<restaurantType[]>('user/getLoveRestaurant','GET', null, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
            console.log(e)
            return e
       }
    },

    async validateToken(token: string) {
        try {
            const tokenStatus = await http<{ status: string }>('/authentication/checkToken', 'GET', null, {
                Authorization: `Bearer ${ token }`,
            });
            return tokenStatus.status && token
        } catch (e) {
            if (e == Code.Unauthorized) {
                return AuthenticationAPI.refreshToken(token);
            } else {
                throw new Error('invalid token');
            }
        }
    },

    async refreshToken(token: string) {
        try {
            return await http<{ token: string }>('/authentication/refreshToken', 'POST', JSON.stringify({ token }), {
                'Content-Type': 'application/json;charset=utf-8',
            });
        } catch (e) {
            return false;
        }
    }
};