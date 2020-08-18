import {http} from './api'
import {bunner} from '../interfaces/bunner'


export const AppAPI={
    async get(){

        const response = await http<bunner[]>('api/restaurant/getBunners')
        return response
    }
}