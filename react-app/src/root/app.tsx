import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootLayOut } from '../core/components/lay-outs/root-lay-out/root.layOut';
import { Core } from '../core/enums/core.enum';
import { get_countries } from '../core/redux/countries/actions';
import { getLocaleStorageItem } from '../core/utils/locale-storage.utils';
import { Sorts } from '../core/utils/sorts';
import { useRoutes } from '../core/router/routes';
import { useAppUtils } from './root.utils';

export const App = () => {
  const dispatch = useDispatch()
  const [isValidateTokenEnd, setIsValidateTokenEnd] = useState<boolean>(false)
  const routes = useRoutes(getLocaleStorageItem(Core.Token))
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
    <Router>
      {isValidateTokenEnd &&
      <RootLayOut>
        { routes }
      </RootLayOut>}
    </Router>
  )
}