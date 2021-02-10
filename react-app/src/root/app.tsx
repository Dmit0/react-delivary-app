import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootLayOut } from '../core/components/lay-outs/root-lay-out/root.layOut';
import { get_countries } from '../core/redux/countries/actions';
import { getToken } from '../core/redux/user/selectors';
import { meals } from '../core/types';
import { Sorts } from '../core/utils/sorts';
import { useRoutes } from '../core/router/routes';
import { useAppUtils } from './root.utils';

export const App = () => {
  const dispatch = useDispatch()
  const [isValidateTokenEnd, setIsValidateTokenEnd] = useState<boolean>(false)
  const token = useSelector(getToken);
  const routes = useRoutes(token)
  const { validateToken, setCartLength } = useAppUtils()

  //token && refreshToken logic
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token).then(() => setIsValidateTokenEnd(true));
    dispatch(get_countries());
    if (!token) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]') as meals[];
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