import React, { useCallback, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'
import {Cart_item} from '../components/content/cart_item'
import{set_meal_from_localestorage_to_cart,remove_one_meal_from_cart,remove_item_from_cart,set_meal_to_cart,clean_cart} from '../redux/actions/cartActions'
import {meals as Mealtype} from '../interfaces/meals'
import '../css/cart.css'



export const Cart =()=>{

    const dispatch=useDispatch()

    const {cart}=useSelector((state:RootState)=>{
        return{
          cart:state.cart.cart
        }
      })

      const count_items=useCallback(():Number=>{
            let num=cart.reduce((sum,current)=>(
              sum+current.count
            ),0)
            return num    
      },[cart])

      const count_total_price=useCallback(():Number=>{
          let num = cart.reduce((sum,current)=>(
            sum+current.price*current.count
          ),0)
          return num
      },[cart])

    useEffect(()=>{
          
              const cart_items=JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[]
              dispatch(set_meal_from_localestorage_to_cart(cart_items))
        // eslint-disable-next-line
    },[])
    useEffect(()=>{
        
          localStorage.setItem('cart',JSON.stringify(cart))
       
      },[cart])

    const deleteOneItem=(meal:Mealtype)=>{
        dispatch(remove_one_meal_from_cart(meal))
    }

    const deleteMealFromCart=(meal:Mealtype)=>{
        dispatch(remove_item_from_cart(meal))
    }

    const addMeal=(meal:Mealtype)=>{
        dispatch(set_meal_to_cart(meal))
    }

    const clear_cart_Heandler=()=>{
        dispatch(clean_cart())
    }
    return (
        <>
         <div className="App">
           <NavBar cart_length={cart}/>
            <div className="App__content">
                <div className="cart">
                    <div className='cart-header'>
                        <div className='cart-description'>
                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-cart-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path
                                  fill-rule="evenodd"
                                  d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                            <span className='car-item-description'>Cart</span>
                        </div>
                        <div className='delete-butoon-controller' onClick={clear_cart_Heandler}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            <span className='delete-block-name'>Clean cart</span>
                            
                        </div>
                    </div>
                    <div className='cart-body'>
                        {cart.map(item=>(
                             <Cart_item key={item._id + Date.now()} meal={item} onDelteOneItem={deleteOneItem} onDelteMeal={deleteMealFromCart} onAddMeal={addMeal}/>   
                                             
                        ))}
                        <div className='info'>
                            <span>Total Items : {count_items()}</span>
                            <span>Order amount : <span className='total_sum'>{count_total_price()} bun</span></span>
                        </div>
                    </div>
                    <div className='cart-footer'>
                        <Link to={'/HomePage'}><button type="button" className="btn btn-outline-warning return_button">Return</button></Link>
                        <button type="button" className="btn btn-outline-warning pay_button">Pay now</button>
                    </div>
                </div>
            </div>
            <div className="App__footer"></div>
        </div>
        </>
    )
}