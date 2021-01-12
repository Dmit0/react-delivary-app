import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import User from '../../pages/user-page';
import { Links } from '../enums/links.enum';


export const useRoutes = () => {
  return (
    <Switch>
      <Route path={ Links.HOME } exact>
        <Home/>
      </Route>
      <Route path={ Links.CART } exact>
        <Cart/>
      </Route>
      <Route path={ Links.MEALS }>
        <Meal/>
      </Route>
      <Route path={ Links.USER }>
        <User/>
      </Route>
      <Redirect to={ Links.HOME }/>
    </Switch>
  );
};