import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {MealsPage} from './pages/MealsPage';
import {Cart} from './pages/CartPage'
import { UserPage } from './pages/userPage';
 

//type management = 'admin' | 'subadmin' | 'customer' // сделать запрос в индексе на роли (можно санком) положить их в редакс потом здесь получить селектором распарсить и записать в типы 

type Access= 'guest' | 'user' | 'management'

export const useRoutes = (status: Access = 'guest') => {
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