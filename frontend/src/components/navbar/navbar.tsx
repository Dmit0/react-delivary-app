import React from 'react';
import '../../css/header.css';
import {Link} from 'react-router-dom'
import {meals} from '../../interfaces/meals'


interface NavBarProps{
  cart_length:meals[]
}


export const NavBar:React.FC<NavBarProps>=({cart_length})=>{
  const count=():Number=>{
    let num=cart_length.reduce((sum,current)=>(
      sum+current.count
    ),0)

    return num
  }
    return(
        <div className="App__header ">
        <div className="App_header__main">
            <nav className="navbar navbar-light">
              <div className="container-fluid App_header__main-container ">
                <Link to={`/HomePage`}> 
                  <span className="navbar-brand  App_header__main-Header">
                      <img src="./assets/leaf.svg" width="30" height="30" alt="" loading="lazy"/>
                      Delivary
                  </span>
                </Link>
                <input className="form-control mr-2 App_header__secondary-input" type="search" placeholder="Search" aria-label="Search"/>
                <div className="button-controller">
                  <button type="button" className="btn btn-outline-info App_header__main-button">LogIn</button>
    <Link to={'/cart'}>
      <button type="button" className="btn btn-warning App_header__secondary-button">Cart
        <span className="App_header__secondary-cart">
         {count()}
        </span>
    </button>
    </Link>
                </div>
              </div>
              </nav>
            </div>
        <div className="App_header__secondary-wrapper">
          <div className="App_header__secondary">
              <nav className="navbar">
                <div className="container-fluid  App_header__secondary-container">
                  <div className="App_header__secondary-action">
                    <span className="navbar-brand-menu">All</span>
                    <span className="navbar-brand-menu">Loved</span>
                  </div>
                </div>
              </nav>   
          </div>
        </div>
      </div>
    )
}