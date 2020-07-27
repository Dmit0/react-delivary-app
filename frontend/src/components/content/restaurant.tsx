import React from 'react';
import '../../css/content.css';

export const Restaurant=()=>{
   return (
    <div className="card-inline">
        <img src="./assets/pizza.jpeg"  className="card-img-top" alt="..."/>
        <div className="App__content-main-card-info">
            <span className="card-inline-name">name</span>
            <span className="card-inline-content">content</span>
            <span className="card-inline-time">8:00 - 22:00</span>
        </div>
    </div>  
   )
}