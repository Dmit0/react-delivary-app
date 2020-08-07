import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'
import {Cart_item} from '../components/content/cart_item'
import{set_meal_from_localestorage_to_cart} from '../redux/actions/cartActions'
import {meals as Mealtype} from '../interfaces/meals'
import '../css/cart.css'



export const Cart =()=>{

    const dispatch=useDispatch()

    const {cart}=useSelector((state:RootState)=>{
        return{
          cart:state.cart.cart
        }
      })

      useEffect(()=>{
        const cart_items=JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[]
        dispatch(set_meal_from_localestorage_to_cart(cart_items))
        // eslint-disable-next-line
       },[])


    return (
        <>
         <div className="App">
            <NavBar cart_length={cart.length}/>
            <div className="App__content">
                <div className="cart">
                    <div className='cart-header'>
                        <div className='cart-description'></div>
                        <div className='delete-butoon-controller'></div>
                    </div>
                    <div className='cart-body'>
                        {cart.map(item=>(
                            
                            <Cart_item key={item._id + Date.now()} meal={item}/>
                        ))}
                        <div className='info'>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className='cart-footer'>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="App__footer"></div>
        </div>
        </>
    )
}