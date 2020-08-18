import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {NavBar} from '../components/navbar/navbar'
import {Banners} from '../components/content/banners'
import {Restaurant} from '../components/content/restaurant'
import {set_restaurants,set_current_restaurant,set_filtered_restaurants} from '../redux/actions/restaurants'
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
 
  
  const {fetched_restaurants,loading,loverestaurant,cart,bunners,cuisenTypes,restaurants_to_show}=useSelector((state:RootState)=>{
    return{
      fetched_restaurants:state.restaurant.restaurants,
      restaurants_to_show:state.restaurant.filter_restaurants,
      loading:state.app.loading,
      loverestaurant:state.loved.loved_restaurants,
      cart:state.cart.cart,
      bunners:state.app.bunners,
      cuisenTypes:state.restaurant.cuisen
    }
  }) 

 
 // const [currentFilterText,setCurrentFilterText]=useState<string>('')
  const [currentSortType,setCurrentSortType]=useState<string>('All')
  const [currentCuisen,setCurrentCuisen]=useState<string>('')

  const sortTypeHeandler=(type:string)=>{
    //setCurrentFilterText('')
    setCurrentSortType(type)
    if(type!=='All' && type!=='Opened'&&type!=='Loved'){
      setCurrentCuisen(type)
      let cuisen = cuisenTypes.find(item=>item.name===type)
      if (cuisen){
        dispatch(set_filtered_restaurants(fetched_restaurants,cuisen))
      }
    }
    else if(type==='Loved'){
      dispatch(set_filtered_restaurants(fetched_restaurants,type,loverestaurant))
    }
    else dispatch(set_filtered_restaurants(fetched_restaurants,type))
   
  }

  const restaurantHeandler=(restaurant:restaurantType)=>{
    dispatch(set_current_restaurant(restaurant))//чанком добавить милы ?
  }

  const loveHeandler=(restaurant:restaurantType,value:boolean)=>{
    if(value){dispatch(add_restaurant_to_loved(restaurant))}
    else {dispatch(remove_restaurant_from_loved(restaurant))}
  }

 const check=(id:string)=>{
     if(loverestaurant.length){
      let checked=loverestaurant.find((item)=>{
          return item._id===id
        })
        return !!checked
      }
     else return false
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

  // useEffect(()=>{
  //   if(currentFilterText!==''){
  //     fetched_restaurants.forEach(restaurant => {
  //       if(restaurant.name.includes(currentFilterText)){
  //         //console.log(restaurant)
  //         setCurrentFilterRestaurants((prev)=>[...prev,restaurant])    
  //       }
  //     });
  //   }
  // // eslint-disable-next-line
  // },[currentFilterText,fetched_restaurants])//переписать поиск на что то получше
 
  return (
    <div className="App">
      <NavBar 
      cart_length={cart} 
      //onFilterTextChange={handleFilterTextChange} 
      filterType={currentSortType}
      //value={currentFilterText} 
      onSetSortType={sortTypeHeandler} 
      cuisenTypes={cuisenTypes}
      currentCuisen={currentCuisen}
       //cuisenChangeHeandler={cuisenChangeHeandler}
      />
      <div className="App__content">
        <Banners bunners={bunners}/>
          <div className="App__content-main">
            {!loading ? 
                restaurants_to_show.map(item=>(
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


