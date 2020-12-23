import { useDispatch } from 'react-redux';
import { AuthenticationAPI } from '../api/part_apis/authenticationApi';
import { cartApi } from '../api/part_apis/cartApi';
import { UserAPI } from '../api/part_apis/userApi';
import { meals as MealType } from '../interfaces/meals';
import { setToken, setUser } from '../redux/actions/authentication';

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
        phone: phone.code + phone.phoneNumber,
        role: _doc.role,
        status: _doc.status,
        cartMealId: cart.countOfItems
      }));
    }
  };

  return { getUser, validateToken }
}