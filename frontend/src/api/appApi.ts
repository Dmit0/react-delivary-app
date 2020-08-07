import {http} from './api'



export const AppAPI={
    async get(){

        const response = await http<string[]>('api/restaurant/getBunners')
        return response
    }
}