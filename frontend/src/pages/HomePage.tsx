import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {NavBar} from '../components/navbar/navbar'
import {Banners} from '../components/content/banners'
import {Restaurant} from '../components/content/restaurant'
import {set_restaurants,set_current_restaurant} from '../redux/actions/restaurants'
import {RootState} from '../redux/reducers/rootReducer'
import {restaurant} from '../interfaces/restaurant'
import '../css/content.css';
import '../css/styles.css';













export const HomePage:React.FC = () => {

  const dispatch=useDispatch()
  
  
  const {fetched_restaurants,loading}=useSelector((state:RootState)=>{
    return{
      fetched_restaurants:state.restaurant.restaurants,
      loading:state.app.loading
    }
  })
  const restaurantHeandler=(restaurant:restaurant)=>{
    dispatch(set_current_restaurant(restaurant))//чанком добавить милы
  }




  useEffect(()=>{
     dispatch(set_restaurants())
   },[dispatch])  
  


  return (
    <div className="App">
      <NavBar/>
      <div className="App__content">
        <Banners/>
          <div className="App__content-main">
            {!loading ? 
            fetched_restaurants.map(item=>(
              <Link to={`/MealsPage/${item.name}`} key={item._id} ><Restaurant restaurant={item} onRestaurantClick={restaurantHeandler}/></Link>
            ))
           :<div>loading...</div>//замениь библиотекой 
          }    
          </div>
         
      </div>
      <div className="App__footer"></div>
    </div>
  );
}


