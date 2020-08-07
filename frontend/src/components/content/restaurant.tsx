import React from 'react';
import '../../css/content.css';
import {Link} from 'react-router-dom'
import {restaurant} from '../../interfaces/restaurant'


interface RestaurantProps{
    restaurant:restaurant
    onRestaurantClick(restaurant:restaurant):void
    toggleLoved(restaurant:restaurant,value:boolean):void
    checked:boolean
}


export const Restaurant:React.FC<RestaurantProps>=({restaurant,onRestaurantClick,toggleLoved,checked})=>{

    const onToggle=(e: React.ChangeEvent<HTMLInputElement>)=>{
        toggleLoved(restaurant,e.target.checked)       
    }

   return (
    <>
        <div className="card-inline">   
           
            <label className="check option">
                <input checked={checked} type ="checkbox"  className="myCheckbox__input" onChange={onToggle}/> 
                <span className="check__box"  ></span>
            </label>
            <Link to={`/MealsPage/${restaurant.name}`}><div onClick={()=>onRestaurantClick(restaurant)}>     
                <img src={restaurant.picture}  className="card-img-top" alt="..."/>
                
                <div className="App__content-main-card-info">
                    <span className="card-inline-name">{restaurant.name}</span>
                    <span className="card-inline-content">{restaurant.description}</span>
                    <span className="card-inline-time">{restaurant.working_time}</span>
                </div>           
            </div></Link> 
        </div>         
    </> 
   )
}