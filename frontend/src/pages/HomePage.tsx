import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {NavBar} from '../components/navbar/navbar'
import {Banners} from '../components/content/banners'
import {Restaurant} from '../components/content/restaurant'
import {set_restaurants,set_current_restaurant} from '../redux/actions/restaurants'
import {add_restaurant_to_loved,remove_restaurant_from_loved,set_loved_restaurant_from_localeStorage} from '../redux/actions/loveActions'
import {get_bunners} from '../redux/actions/appActions'
import{set_meal_from_localestorage_to_cart} from '../redux/actions/cartActions'
import {RootState} from '../redux/reducers/rootReducer'
import {restaurant as restaurantType} from '../interfaces/restaurant'
import {meals as Mealtype} from '../interfaces/meals'
import '../css/content.css';
import '../css/styles.css';














export const HomePage:React.FC = () => {

  const dispatch=useDispatch()
  
  
  const {fetched_restaurants,loading,loverestaurant,cart,bunners}=useSelector((state:RootState)=>{
    return{
      fetched_restaurants:state.restaurant.restaurants,
      loading:state.app.loading,
      loverestaurant:state.loved.loved_restaurants,
      cart:state.cart.cart,
      bunners:state.app.bunners
    }
  })
  const restaurantHeandler=(restaurant:restaurantType)=>{
    dispatch(set_current_restaurant(restaurant))//чанком добавить милы ?
  }

  const loveHeandler=(restaurant:restaurantType,value:boolean)=>{
    if(value){dispatch(add_restaurant_to_loved(restaurant))}
    else {dispatch(remove_restaurant_from_loved(restaurant))}
  }

 
  useEffect(()=>{
     dispatch(set_restaurants())
   },[dispatch])  
  
   useEffect(()=>{
     if(loverestaurant.length>0){
       localStorage.setItem('loved',JSON.stringify(loverestaurant))
     }
   },[loverestaurant])

   useEffect(()=>{
     dispatch(get_bunners())
     // eslint-disable-next-line
   },[])

   useEffect(()=>{
    const restaurants=JSON.parse(localStorage.getItem('loved') || '[]') as restaurantType[]
    dispatch(set_loved_restaurant_from_localeStorage(restaurants))
    // eslint-disable-next-line
   },[])

  useEffect(()=>{
   const cart_items=JSON.parse(localStorage.getItem('cart') || '[]') as Mealtype[]
   dispatch(set_meal_from_localestorage_to_cart(cart_items))
   // eslint-disable-next-line
  },[])

   const check=(id:string)=>{
     if(loverestaurant.length){
      let checked=loverestaurant.find((item)=>{
          return item._id===id
        })
        return !!checked
      }
     else return false
   }

  return (
    <div className="App">
      <NavBar cart_length={cart.length}/>
      <div className="App__content">
        <Banners bunners={bunners}/>
          <div className="App__content-main">
            {!loading ? 
            fetched_restaurants.map(item=>(
                <Restaurant key ={item._id} restaurant={item} onRestaurantClick={restaurantHeandler} toggleLoved={loveHeandler} checked={check(item._id)}/>
            ))
           :<div>loading...</div>//замениь библиотекой 
          }    
          </div>
      </div>
      <div className="App__footer"></div>
    </div>
  );
}


