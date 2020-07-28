import React from 'react';
import '../../css/content.css';

interface restaurant{
    picture:string,
    name:string,
    description:string,
    working_time:string,
    _id:number
}

interface RestaurantProps{
    restaurants:restaurant[]
}


export const Restaurant:React.FC<RestaurantProps>=({restaurants})=>{
   return (
    <>
    {restaurants.map(item=>(
        <div key={item._id} className="card-inline">
            <img src={item.picture}  className="card-img-top" alt="..."/>
            <div className="App__content-main-card-info">
                <span className="card-inline-name">{item.name}</span>
                <span className="card-inline-content">{item.description}</span>
                <span className="card-inline-time">{item.working_time}</span>
            </div>
        </div> 
    ))}
    </> 
   )
}