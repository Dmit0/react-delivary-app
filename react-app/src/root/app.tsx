import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from '../components/navbar/navbar';
import { getToken } from '../redux/selectors/auth.selectors';
import { getCart } from '../redux/selectors/cart.selector';
import { useRoutes } from '../routes';
import { useAppUtils } from './root.utils';

export const App = () => {
  const { getUser, validateToken } = useAppUtils()
  const routes = useRoutes()
  const tokenFromStore = useSelector(getToken)
  //const cart = useSelector(getCart)

  //token && refreshToken logic
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token);
  },[]);

  //get user logic
  useEffect(() => {
    tokenFromStore && getUser(tokenFromStore);
  }, [ tokenFromStore ]);

  //set token to store logic
  useEffect(() => {
    tokenFromStore && localStorage.setItem('token', JSON.stringify(tokenFromStore));
  }, [ tokenFromStore ])

  return (
    <Router>
      <NavBar />
      { routes }
    </Router>
  )
}