import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { get_countries } from '../core/redux/countries/actions';
import { getToken } from '../core/redux/user/selectors';
import { meals } from '../core/types';
import { Sorts } from '../core/utils/sorts';
import { NavBar } from '../core/components/navbar/navbar';
import { useRoutes } from '../core/router/routes';
import { useAppUtils } from './root.utils';

export const App = () => {
  const dispatch = useDispatch()
  const routes = useRoutes()
  const tokenFromStore = useSelector(getToken)
  const { getUser, validateToken, setCartLength } = useAppUtils()

  //token && refreshToken logic
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token);
    dispatch(get_countries());
  },[]);

  //get user logic
  useEffect(() => {
    tokenFromStore && getUser(tokenFromStore);
  }, [ tokenFromStore, getUser ]);

  //set token to store logic
  useEffect(() => {
    tokenFromStore && localStorage.setItem('token', JSON.stringify(tokenFromStore));
  }, [ tokenFromStore ])

  useEffect(() => {
    if (!tokenFromStore) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
      setCartLength(Sorts.getMealCount(cart));
    }
  }, [ tokenFromStore, setCartLength ]); // TODO: `Create solution for issue about 1st render it always true`

  return (
    <Router>
      <NavBar />
      { routes }
      <div className="App__footer"></div>
    </Router>
  )
}