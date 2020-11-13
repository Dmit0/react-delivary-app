import { loginData } from '../../interfaces/authentication';
import {http} from '../api'

export const AuthenticationAPI = {
    async createAccount(user: any) {
        const response = await http('/authentication/SignUp', 'POST', JSON.stringify(user), {
            'Content-Type': 'application/json;charset=utf-8',
        });
        return response;
    },
    async verifyMail(email: string) {
        console.log(email)
        const response = await http<boolean>('/authentication/verifyMail', 'POST', JSON.stringify({ email }), {
            'Content-Type': 'application/json;charset=utf-8',
        })
        return response
    },

    //logInResponse
    async logIn(data: loginData) {
        return await http<any>('/authentication/signIn', 'POST', JSON.stringify( data ), {
            'Content-Type': 'application/json;charset=utf-8',
        });
    },
};