import {ThunkAction} from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import { Action } from 'redux'
import {restaurant,cuisen} from '../../interfaces/restaurant'
import {Sorts} from '../../api/sorts'
//import {meals} from '../../interfaces/meals'
import {show_loading,hide_loading} from './appActions'
import {restaurantAPI,MealAPI} from '../../api/ReastaurantApi'
import {SET_CURRENT_RESTAURANT,SET_REASTAURANTS,SET_MEALS,restaurantActionTypes,SET_CUISENS,SET_FILTER_RESTAURANTS} from '../types/restaurantsTypes'



type ThunkType=ThunkAction<Promise<void>, RootState, unknown, Action<string>>



export const set_restaurants=():ThunkType=>{
    return async dispatch=>{
        dispatch(show_loading())
        
        let restaurants=await restaurantAPI.get()
        let cuisenTypes=await restaurantAPI.getCuisenTypes()

        dispatch(hide_loading())
        
        dispatch({
           type:SET_REASTAURANTS,
           restaurants
       })
        
       dispatch({
           type:SET_CUISENS,
           cuisenTypes
       })
       if(restaurants!==undefined){
          dispatch(set_filtered_restaurants(restaurants,'All')) 
       }
    }
}

// export const set_intoStore_restaurants=(restaurants:any):restaurantActionTypes=>{
//     return{
//         type:SET_INTOSTORE_RESTAURANTS,
//         payload_restaurants:restaurants
//     }
// }

export const set_current_restaurant=(current_restaurant:restaurant):ThunkAction<Promise<void>, RootState, unknown, restaurantActionTypes>=>{
    return async dispatch=>{
        dispatch({
            type:SET_CURRENT_RESTAURANT,
            restaurant:current_restaurant
        })
        let meals = await MealAPI.get(current_restaurant._id)
        dispatch(set_meals(meals))
    }
}

export const set_meals=(meals:any):restaurantActionTypes=>{
    return{
        type:SET_MEALS,
        meals:meals
    }
}

export const get_meals_by_restaurant_id=(id:string):ThunkAction<Promise<void>, RootState, unknown, restaurantActionTypes>=>{
    return async dispatch=>{
       
        let meals = await MealAPI.get(id,true)
        dispatch(set_meals(meals))
    }
}

export const set_filtered_restaurants=(currentRestaurants:restaurant[],Filtertype:string | cuisen,loveRestaurants:restaurant[]=[]):restaurantActionTypes=>{
    
    let sortedArray:restaurant[]=[]

    switch(Filtertype){
        case 'All':
            sortedArray=currentRestaurants;break;
        case 'Opened':
            sortedArray=Sorts.Opened(currentRestaurants);break;
        case 'Loved':
            sortedArray=loveRestaurants;break;//в зависимости от того зареган или нет пользователь
        default:           
            if(typeof Filtertype!=='string'){                 
                sortedArray=Sorts.ByCuisen(currentRestaurants,Filtertype)
                console.log(sortedArray)
            };break;    
    }
    return{
        type:SET_FILTER_RESTAURANTS,
        filter:sortedArray
    }
}