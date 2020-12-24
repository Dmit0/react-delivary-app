import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Sorts } from '../api/utils/sorts';
import { NavBar } from '../components/navbar/navbar';
import { meals as MealType } from '../interfaces/meals';
import { getToken } from '../redux/selectors/auth.selectors';
import { useRoutes } from '../routes';
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
  }, [ tokenFromStore ]);

  //set token to store logic
  useEffect(() => {
    tokenFromStore && localStorage.setItem('token', JSON.stringify(tokenFromStore));
  }, [ tokenFromStore ])

  useEffect(() => {
    if (!tokenFromStore) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as MealType[];
      setCartLength(Sorts.getMealCount(cart));
    }
  }, [ tokenFromStore, setCartLength ]);

  return (
    <Router>
      <NavBar />
      { routes }
    </Router>
  )
}