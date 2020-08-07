import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import '../css/meals-content.css'
import{set_meal_to_cart,set_meal_from_localestorage_to_cart} from '../redux/actions/cartActions'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'
import {Meal} from '../components/content/meal'
import {meals as Mealtype} from '../interfaces/meals'



export const MealsPage:React.FC = () => {

    const dispatch=useDispatch()
    const {meals,cart}=useSelector((state:RootState)=>{
        return {
            meals:state.restaurant.current_meals,
            cart:state.cart.cart
        }
    })

    const addHeandler=(meal:Mealtype)=>{
        dispatch(set_meal_to_cart(meal))
    }

    useEffect(()=>{
        const cart_items=JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[]
        dispatch(set_meal_from_localestorage_to_cart(cart_items))
        // eslint-disable-next-line
       },[])

    useEffect(()=>{
        if(cart.length>0){
          localStorage.setItem('cart',JSON.stringify(cart))
        }
      },[cart])
   

    return (
        <>
         <div className="App">
            <NavBar cart_length={cart.length}/>
         <div className="App__meals-container">
            <div className="App__content-main">
                {meals.map(meal=>(
                    <Meal key={meal._id} meal={meal} onAdd={addHeandler}/>
                ))}
            </div>
        </div>
        <div className="App__footer"></div>
        </div>
        </>
    )
}