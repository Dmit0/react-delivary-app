import {restaurant} from '../interfaces/restaurant'
import {meals} from '../interfaces/meals'
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

type MealsResponseType={
    meals:meals[]
}

export const MealAPI={
    async get(_id:string){
        
        let method='POST'
        let body=JSON.stringify({_id})
        let headers={
            'Content-Type': 'application/json;charset=utf-8'
        }

        const response = await http<MealsResponseType>('api/restaurant/getMeal',method,body,headers)
        return response
    }
}