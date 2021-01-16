import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import User from '../../pages/user-page';
import { Links } from '../enums';
import { getToken } from '../redux/user/selectors';

export const useRoutes = () => {
  const token = useSelector(getToken);
  return <Switch>
    <Route path={ Links.HOME } exact>
      <Home/>
    </Route>
    <Route path={ Links.CART } exact>
      <Cart/>
    </Route>
    <Route path={ Links.MEALS }>
      <Meal/>
    </Route>
    { token && (
      <Route path={ Links.USER }>
        <User/>
      </Route>
    ) }
    <Redirect to={ Links.HOME }/>
  </Switch>;

};

const defaultRoutes = () => {
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
      <Redirect to={ Links.HOME }/>
    </Switch>
  );
};

const userRoutes = () => {
  return (
    <switch>
      <Route path={ Links.HOME } exact>
        <Home/>
      </Route>
      <Route path={ Links.CART } exact>
        <Cart/>
      </Route>
      <Route path={ Links.USER } exact>
        <User/>
      </Route>
      <Route path={ Links.MEALS }>
        <Meal/>
      </Route>
      <Redirect to={ Links.HOME }/>
    </switch>
  );
};