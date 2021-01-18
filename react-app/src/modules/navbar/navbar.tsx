import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DeliveryIcon } from '../../core/components/icons';
import { Links } from '../../core/enums';
import '../../core/css/header.css';
import { openPopup } from '../../core/redux/popup/actions';
import { LogIn } from '../auth/signIn/signIn';
import { NavBarButtons } from './components/buttons-controller';

export const NavBar = () => {
  const dispatch = useDispatch();
  const handleAuthOpen = useCallback( () => {
    dispatch(openPopup(<LogIn/>))
  },[dispatch]);

  return (
    <>
      <div className="App__header ">
        <div className="App_header__main">
          <nav className="navbar navbar-light">
            <div className="container-fluid App_header__main-container ">
              <Link to={Links.HOME}>
                <span className="navbar-brand  App_header__main-Header">
                  <DeliveryIcon height={'30'} width={'30'}/>
                </span>
              </Link>
              <span className="Partnership">Partnership</span>
              <NavBarButtons handleAuthOpen={handleAuthOpen}/>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
