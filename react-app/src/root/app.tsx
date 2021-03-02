import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootLayOut } from '../core/components/lay-outs/root-lay-out/root.layOut';
import { Core } from '../core/enums/core.enum';
import { get_countries } from '../core/redux/countries/actions';
import Router from '../core/router/Router';
import { routes } from '../core/router/routes-config';
import { getLocaleStorageItem } from '../core/utils/locale-storage.utils';
import { Sorts } from '../core/utils/sorts';
import { useAppUtils } from './root.utils';
import { BrowserRouter } from 'react-router-dom';

export const App = () => {
  const dispatch = useDispatch()
  const [isValidateTokenEnd, setIsValidateTokenEnd] = useState<boolean>(false)
  const { validateToken, setCartLength } = useAppUtils() //TODO `remove utils`

  //token && refreshToken logic
  useEffect(() => {
    const token = getLocaleStorageItem(Core.Token);
    token && validateToken().then(() => setIsValidateTokenEnd(true));
    dispatch(get_countries());
    if (!token) {
      const cart = getLocaleStorageItem(Core.Cart, '[]');
      setCartLength(Sorts.getMealCount(cart));
      setIsValidateTokenEnd(true)
    }
  }, []);

  return (
    <BrowserRouter>
      { isValidateTokenEnd &&
      <RootLayOut>
        <Router routes={ routes }/>
      </RootLayOut> }
    </BrowserRouter>
  );
}