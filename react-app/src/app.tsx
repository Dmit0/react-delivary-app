import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationAPI } from './api/part_apis/authenticationApi';
import { UserAPI } from './api/part_apis/userApi';
import { setToken, setUser } from './redux/actions/authentication';
import { getToken } from './redux/selectors/auth.selectors';
import { useRoutes } from './routes';

export const App = () => {
  const routes = useRoutes()
  const dispatch = useDispatch()
  const token = useSelector(getToken)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token') || '""');
    token && validateToken(token);
  },[]);

  useEffect(() => {
    token && getUser(token);
  }, [ token ]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    }
  },[ token ])

  const validateToken = async(token: string) => {
    const validateToken = await AuthenticationAPI.validateToken(token)
    if (validateToken) {
      localStorage.setItem('token', JSON.stringify(validateToken));
      dispatch(setToken(validateToken));
    }
  }

  const getUser = async (token: string) => {
    const user = await UserAPI.getUser(token);
    if (user) {
      const { phone, _doc } = user;
      dispatch(setUser({
        token,
        email: _doc.email,
        firstName: _doc.name,
        userId: _doc._id,
        phone: phone.code + phone.phoneNumber,
        role: _doc.role,
        status: _doc.status,
      }));
    }
  };

  return (
    <Router>
      { routes }
    </Router>
  )
}