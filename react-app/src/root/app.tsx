import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootLayOut } from '../core/components/lay-outs/root-lay-out/root.layOut';
import { Core } from '../core/enums/core.enum';
import { getCurrentUserLocation } from '../core/redux/app/actions';
import { rootTokenValidate, validateToken } from '../core/redux/auth/actions';
import { getIsTokenValidate } from '../core/redux/auth/selectors';
import { set_cart_length } from '../core/redux/cart/actions';
import { get_countries } from '../core/redux/countries/actions';
import Router from '../core/router/Router';
import { routes } from '../core/router/routes-config';
import { getLocaleStorageItem } from '../core/utils/locale-storage.utils';
import { Sorts } from '../core/utils/sorts';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  const dispatch = useDispatch()
  const isTokenValidated = useSelector(getIsTokenValidate);

  //token && refreshToken logic
  useEffect(() => {
    const token = getLocaleStorageItem(Core.Token);
    token && dispatch(validateToken())
    dispatch(get_countries());
    dispatch(getCurrentUserLocation())
    if (!token) {
      const cart = getLocaleStorageItem(Core.Cart, '[]');
      dispatch(set_cart_length(Sorts.getMealCount(cart)));
      dispatch(rootTokenValidate())
    }
  }, []);

  return (
    <BrowserRouter>
      { isTokenValidated &&
      <RootLayOut>
        <Router routes={ routes }/>
      </RootLayOut> }
    </BrowserRouter>
  );
}