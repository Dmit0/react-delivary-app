import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { getToken } from '../core/redux/auth/selectors';
import { meals } from '../core/types';
import { Sorts } from '../core/utils/sorts';
import { NavBar } from '../core/components/navbar/navbar';
import { useRoutes } from '../core/router/routes';
import { useAppUtils } from './root.utils';

export const App = () => {
  const { getUser, validateToken, setCartLength } = useAppUtils()
  const routes = useRoutes()
  const tokenFromStore = useSelector(getToken)

  //token && refreshToken logic
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token);
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
    </Router>
  )
}