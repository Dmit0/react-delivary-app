import React from 'react';
import '../../css/content.css';
import {restaurant} from '../../interfaces/restaurant'


interface RestaurantProps{
    restaurant:restaurant,
    onRestaurantClick(restaurant:restaurant):void
}


export const Restaurant:React.FC<RestaurantProps>=({restaurant,onRestaurantClick})=>{

   return (
    <>
        <div className="card-inline" onClick={()=>onRestaurantClick(restaurant)}>           
            <img src={restaurant.picture}  className="card-img-top" alt="..."/>
            <div className="App__content-main-card-info">
                <span className="card-inline-name">{restaurant.name}</span>
                <span className="card-inline-content">{restaurant.description}</span>
                <span className="card-inline-time">{restaurant.working_time}</span>
            </div>           
        </div>       
    </> 
   )
}