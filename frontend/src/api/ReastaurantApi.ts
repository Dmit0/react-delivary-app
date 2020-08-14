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
    
    async get(_id:string,isRequestFromMealsPage=false){
        const response = await http<MealsResponseType>(isRequestFromMealsPage ? '/api/restaurant/getMeal' : 'api/restaurant/getMeal','POST',JSON.stringify({_id}),{
            'Content-Type': 'application/json;charset=utf-8'
        })
        return response
    },
}