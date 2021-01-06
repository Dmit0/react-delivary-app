import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import User from '../../pages/user-page';


export const useRoutes = () => {
  return (
    <Switch>
      <Route path='/HomePage' exact>
        <Home/>
      </Route>
      <Route path='/cart' exact>
        <Cart/>
      </Route>
      <Route path='/MealsPage/:id'>
        <Meal/>
      </Route>
      <Route path='/userPage'>
        <User/>
      </Route>
      <Redirect to="/HomePage"/>
    </Switch>
  );
};