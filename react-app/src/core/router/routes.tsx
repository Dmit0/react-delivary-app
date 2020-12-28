import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {HomePage} from '../../modules/home/HomePage';
import {MealsPage} from '../../modules/meal-page/MealsPage';
import {Cart} from '../../modules/cart/CartPage'
import { UserPage } from '../../modules/user-page/userPage';

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