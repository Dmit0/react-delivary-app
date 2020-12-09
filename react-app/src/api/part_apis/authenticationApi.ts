import { addressDataStep, loginData } from '../../interfaces/authentication';
import {http} from '../api'

export const AuthenticationAPI = {
    async createAccount(user: any) {
        try {
            return http<boolean>('/authentication/SignUp', 'POST', JSON.stringify(user), {
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
            return await http<{ token: string }>('/authentication/signIn', 'POST', JSON.stringify(data), {
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
    }
};