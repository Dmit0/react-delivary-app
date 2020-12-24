import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import '../css/meals-content.css'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'

export const UserPage: React.FC = () => {
  return (
    <>
      <div className="App">
        <div className="App__meals-container">
          <div className="App__content-main">
          </div>
        </div>
        <div className="App__footer"></div>
      </div>
    </>
  )
}