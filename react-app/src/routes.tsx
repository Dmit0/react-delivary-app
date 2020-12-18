import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Switch,Route,Redirect} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {MealsPage} from './pages/MealsPage';
import {Cart} from './pages/CartPage'
import { UserPage } from './pages/userPage';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/HomePage' exact>
        <HomePage/>
      </Route>
      <Route path='/cart' exact>
        <Cart/>
      </Route>
      <Route path='/MealsPage/:id'>
        <MealsPage/>
      </Route>
      <Route path='/userPage'>
        <UserPage/>
      </Route>
      <Redirect to="/HomePage"/>
    </Switch>
  );
};