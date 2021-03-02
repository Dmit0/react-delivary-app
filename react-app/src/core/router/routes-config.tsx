import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import User from '../../pages/user-page';
import AddAddress from '../../pages/user-page/update-user-pages/add-address-page';
import UpdateAddress from '../../pages/user-page/update-user-pages/update-address-page';
import UpdateUser from '../../pages/user-page/update-user-pages/update-user-page';
import { Links } from '../enums';
import { IRouterConfig } from '../types/routes.types';

export const routes: IRouterConfig[] = [
  {
    path: Links.HOME,
    exact: false,
    component: Home,
  },
  {
    path: '/',
    exact: true,
    redirect: Links.HOME,
  },
  {
    path: Links.CART,
    component: Cart,
    exact: false,
  },
  {
    path: Links.MEALS,
    component: Meal,
    exact: false,
  },
  {
    path: Links.USER,
    component: User,
    exact: true,
    private: true,
  },
  {
    path: `${ Links.USER }${ Links.ADDRESS_ADD }`,
    component: AddAddress,
    private: true,
    exact: false,
  },
  {
    path: `${ Links.USER }${ Links.ADDRESS_UPDATE_ROUTE }`,
    component: UpdateAddress,
    private: true,
    exact: false,
  },
  {
    path: `${ Links.USER }${ Links.USER_UPDATE }`,
    component: UpdateUser,
    private: true,
    exact: false,
  },
];

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
      <Route path={`${Links.USER}${Links.ADDRESS_UPDATE_ROUTE}`}>
        <UpdateAddress/>
      </Route>
      <Route path={`${Links.USER}${Links.USER_UPDATE}`}>
        <UpdateUser/>
      </Route>
      <Redirect to={ Links.HOME }/>
    </Switch>
  );
};