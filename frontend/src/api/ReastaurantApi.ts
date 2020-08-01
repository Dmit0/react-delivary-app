import {restaurant} from '../interfaces/restaurant'
import {http} from './api'

type RestaurantResponseType={
    data:restaurant[],
    resultCode:number,
    messages:Array<string>
}

export const restaurantAPI={
    async get(){
        const response = await http<RestaurantResponseType>('api/restaurant/')
        return response
    }
}