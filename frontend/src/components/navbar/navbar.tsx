import React from 'react';
import '../../css/header.css';

export const NavBar=()=>{
    return(
        <div className="App__header ">
        <div className="App_header__main">
            <nav className="navbar navbar-light">
              <div className="container-fluid App_header__main-container ">
                <span className="navbar-brand  App_header__main-Header">
                    <img src="./assets/leaf.svg" width="30" height="30" alt="" loading="lazy"/>
                  Delivary
                </span>
                <button type="button" className="btn btn-outline-info App_header__main-button">Log In</button>
              </div>
              </nav>
            </div>
        <div className="App_header__secondary-wrapper">
          <div className="App_header__secondary">
              <nav className="navbar">
                <div className="container-fluid  App_header__secondary-container">
                  <div className="App_header__secondary-action">
                    <span className="navbar-brand">All</span>
                    <span className="navbar-brand">Loved</span>
                  </div>
                  <form className="d-flex">
                    <input className="form-control mr-2 App_header__secondary-input" type="search" placeholder="Search" aria-label="Search"/>
                  </form>
                  <button type="button" className="btn btn-outline-warning App_header__secondary-button">Cart</button>
                </div>
              </nav>   
          </div>
        </div>
      </div>
    )
}