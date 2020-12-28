import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import '../../core/css/meals-content.css'
import {RootState} from '../../core/redux/rootReducer'
import {NavBar} from '../../core/components/navbar/navbar'

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