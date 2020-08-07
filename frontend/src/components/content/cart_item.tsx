import React from 'react'
import {meals} from '../../interfaces/meals'
interface CartProps{
    meal:meals
}

export const Cart_item:React.FC<CartProps>=({meal})=>{
    return (
        <>
        <div className='cart-item'>
            <div className='item-description'>
                <div>
                    <img className='cart-img' src={meal.picture}   alt=""></img>
                </div>
                <div className='detalic-item-description'>
                    <span className='item-description-name'>{meal.name} </span>
                    <span className='item-description-price'>{meal.price} bun</span>
                </div>             
            </div>
            {/* <div className='item-button-controller'></div>
            <span className='total-price'>totoal price for items : 0</span>
            <span className='delete-button'></span> */}
        </div>
        </>
    )
}