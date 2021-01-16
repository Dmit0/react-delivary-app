import { useDispatch } from 'react-redux';
import { AuthenticationApi } from '../core/api/apis/authentication.api';
import { UserApi } from '../core/api/apis/user.api';
import { set_cart_length } from '../core/redux/cart/actions/cart.actions';
import { setToken, setUser } from '../core/redux/user/actions/user.actions';

export const useAppUtils = () => {
  const dispatch = useDispatch()

  const validateToken = async(token: string) => {
    const validateToken = await AuthenticationApi.validateToken(token)
    if (validateToken) {
      dispatch(setToken(validateToken));
      await getUser(validateToken)
    }
  }

  const getUser = async (token: string) => {
    const user = await UserApi.getUser(token);
    if (user) {
      const { cart, _doc } = user;
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

  return { validateToken, setCartLength }
}