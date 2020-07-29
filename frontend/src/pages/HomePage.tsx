import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux'
import {NavBar} from '../components/navbar/navbar'
import {Banners} from '../components/content/banners'
import {Restaurant} from '../components/content/restaurant'
import {useHttp} from '../hooks/http_hook'
import {restaurant} from '../interfaces/restaurant'
import {set_restaurants} from '../redux/actions/restaurants'
import {RootState} from '../redux/reducers/rootReducer'
import '../css/content.css';
import '../css/styles.css';






export const HomePage:React.FC = () => {
  const {request}=useHttp()
  const dispatch=useDispatch()
  const {fetched_restaurants}=useSelector((state:RootState)=>{
    return{
      fetched_restaurants:state.restaurant
    }
  })


  useEffect(()=>{
   request('api/restaurant/').then((fetched_restaurant)=>{
     dispatch(set_restaurants(fetched_restaurant))
   })  
  },[request,dispatch])
  return (
    <div className="App">
      <NavBar/>
      <div className="App__content">
        <Banners/>
          <div className="App__content-main">
               
            <Restaurant  restaurants={[]}/>   
          </div>
      </div>
      <div className="App__footer"></div>
    </div>
  );
}


