import React from 'react';
import Cart from '../../pages/cart';
import Home from '../../pages/home';
import Meal from '../../pages/meal-page';
import Order from '../../pages/oreder-page';
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
  {
    path:Links.ORDER ,
    component: Order,
    exact: false,
  },
];