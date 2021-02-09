import { useDispatch } from 'react-redux';
import { AuthenticationApi } from '../core/api/apis/authentication.api';
import { UserApi } from '../core/api/apis/user.api';
import { set_cart_length } from '../core/redux/cart/actions';
import { setToken, setUser } from '../core/redux/user/actions';

export const useAppUtils = () => {
  const dispatch = useDispatch()

  const validateToken = async(token: string) => {
    const validateToken = await AuthenticationApi.validateToken(token)
    if (validateToken) {
      dispatch(setToken(validateToken));
      localStorage.setItem('token', JSON.stringify(validateToken))
      await getUser(validateToken)
    }
  }

  const getUser = async (token: string) => {
    const userData = await UserApi.getUser(token);
    if (userData) {
      const { cart, user, role, addresses, phone } = userData;
      dispatch(setUser({
        token,
        email: user.email,
        firstName: user.name,
        userId: user._id,
        createdAt: user.createdAt,
        role,
        addresses,
        phone
      }));
      setCartLength(cart.countOfItems)
    }
  };

  const setCartLength = (length: any) => {
    dispatch(set_cart_length(length))
  }

  return { validateToken, setCartLength }
}