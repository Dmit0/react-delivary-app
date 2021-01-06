import { useDispatch } from 'react-redux';
import { AuthenticationAPI } from '../core/api/apis/authenticationApi';
import { UserAPI } from '../core/api/apis/userApi';
import { set_cart_length } from '../core/redux/cart/actions/cart.actions';
import { setToken, setUser } from '../core/redux/user/actions/user.actions';

export const useAppUtils = () => {
  const dispatch = useDispatch()

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
      const { phone, cart, _doc } = user;
      dispatch(setUser({
        token,
        email: _doc.email,
        firstName: _doc.name,
        userId: _doc._id,
      }));
      setCartLength(cart.countOfItems)
    }
  };

  const setCartLength = (length: any) => {
    dispatch(set_cart_length(length))
  }

  return { getUser, validateToken, setCartLength }
}