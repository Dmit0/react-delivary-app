import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { toKey } from 'react-select/src/utils';
import { get_countries } from '../core/redux/countries/actions';
import { getToken } from '../core/redux/user/selectors';
import { meals } from '../core/types';
import { Sorts } from '../core/utils/sorts';
import { useRoutes } from '../core/router/routes';
import { NavBar } from '../modules/navbar/navbar';
import { PopupContainer } from '../modules/popup/popup';
import { useAppUtils } from './root.utils';

export const App = () => {
  const dispatch = useDispatch()
  const routes = useRoutes()
  const { validateToken, setCartLength } = useAppUtils()

  //token && refreshToken logic
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token);
    dispatch(get_countries());
    if (!token) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
      setCartLength(Sorts.getMealCount(cart));
    }
  }, []);

  return (
    <Router>
      <NavBar />
      <PopupContainer/>
      { routes }
      <div className="App__footer"/>
    </Router>
  )
}