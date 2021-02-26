import { useDispatch } from 'react-redux';
import { AuthenticationApi } from '../core/api/apis/authentication.api';
import { UserApi } from '../core/api/apis/user.api';
import { Core } from '../core/enums/core.enum';
import { set_cart_length } from '../core/redux/cart/actions';
import { setIsUserLogInToken, setUser } from '../core/redux/user/actions';
import { setLocaleStorageItem } from '../core/utils/locale-storage.utils';

export const useAppUtils = () => {
  const dispatch = useDispatch()

  const validateToken = async() => {
    const validateToken = await AuthenticationApi.validateToken()
    if (validateToken) {
      dispatch(setIsUserLogInToken(true));
      setLocaleStorageItem(Core.Token, validateToken)
      setLocaleStorageItem(Core.RefreshTokenError, false)
      await getUser(validateToken)
    } else dispatch(setIsUserLogInToken(false));
  }

  const getUser = async (token: string) => { //TODO `Remove token`
    const userData = await UserApi.getUser();
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