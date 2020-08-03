import React from 'react';
import '../../css/content.css';
import {meals} from '../../interfaces/meals'


interface RestaurantProps{
    meal:meals,
    //onRestaurantClick(restaurant:restaurant):void
}


export const Meal:React.FC<RestaurantProps>=({meal})=>{

   return (
    <>
        <div className="card-inline meal-card">           
            <img src={meal.picture}  className="card-img-top" alt="..."/>
            <div className="App__content-main-card-info">
                <span className="card-inline-name">{meal.name}</span>
                <span className="card-inline-price">{meal.price}</span>
                <input type="checkbox"/>
            </div>           
        </div>       
    </> 
   )
}