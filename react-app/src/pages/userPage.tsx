import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import '../css/meals-content.css'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'

export const UserPage: React.FC = () => {
  const dispatch=useDispatch()
  const {cart}=useSelector((state:RootState)=>{
    return {
      meals:state.restaurant.current_meals,
      cart:state.cart.cart
    }
  })
  return (
    <>
      <div className="App">
        <NavBar cart_length={cart}/>
        <div className="App__meals-container">
          <div className="App__content-main">
          </div>
        </div>
        <div className="App__footer"></div>
      </div>
    </>
  )
}