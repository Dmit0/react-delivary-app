import {restaurant,cuisen} from '../interfaces/restaurant'
import {meals} from '../interfaces/meals'
import {http} from './api'


// type RestaurantResponseType={
//     data:restaurant[],
// }

type MealsResponseType={
    meals:meals[]
}

type CuisenResponseType={
    cuisens:cuisen[]
}

export const restaurantAPI={
    async get(){       
            const response = await http<restaurant[]>('api/restaurant/')
            return response  
    },
    async getCuisenTypes(){
        const response =await http<CuisenResponseType>('api/restaurant/getCuisenTypes')
        return response
    }
}



export const MealAPI={
    
    async get(_id:string,isRequestFromMealsPage=false){
        const response = await http<MealsResponseType>(isRequestFromMealsPage ? '/api/restaurant/getMeal' : 'api/restaurant/getMeal','POST',JSON.stringify({_id}),{
            'Content-Type': 'application/json;charset=utf-8'
        })
        return response
    },
}