import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import User from '../../pages/user-page';
import AddAddress from '../../pages/user-page/update-user-pages/add-address-page';
import UpdateAddress from '../../pages/user-page/update-user-pages/update-address-page';
import UpdateUser from '../../pages/user-page/update-user-pages/update-user-page';
import { Links } from '../enums';

export const useRoutes = (token: string | null) => {
  return <Switch>
    <Route path={ Links.HOME } exact>
      <Home/>
    </Route>
    <Route path={ Links.CART }>
      <Cart/>
    </Route>
    <Route path={ Links.MEALS }>
      <Meal/>
    </Route>
    { token && ValidatedRoutes()}
    <Redirect to={ Links.HOME }/>
  </Switch>;

};

const ValidatedRoutes = () => {
  return (
    <Switch>
      <Route path={ Links.USER } exact>
        <User/>
      </Route>
      <Route path={`${Links.USER}${Links.ADDRESS_ADD}`}>
        <AddAddress/>
      </Route>
      <Route path={`${Links.USER}${Links.ADDRESS_UPDATE}`}>
        <UpdateAddress/>
      </Route>
      <Route path={`${Links.USER}${Links.USER_UPDATE}`}>
        <UpdateUser/>
      </Route>
      <Redirect to={ Links.HOME }/>
    </Switch>
  );
};