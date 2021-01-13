import { useDispatch } from 'react-redux';
import { AuthenticationAPI } from '../../../core/api/apis/authenticationApi';
import { UserAPI } from '../../../core/api/apis/userApi';
import { add_restaurant_to_loved, remove_restaurant_from_loved } from '../../../core/redux/loveRestaurants/actions';

export const useHomeUtils = () => {
  const dispatch = useDispatch()

  const getRestaurant = async (token: any) => {
    return token
      ? await AuthenticationAPI.getLoveUserRestaurants(token)
      : JSON.parse(localStorage.getItem('loved') || '[]') as string[];
  };

  const userLoveAction = async (restaurantId: string, action: boolean, token: string) => {
    const response = await UserAPI.loveRestaurantAction(token, { restaurantId, action });
    if (response) {
      action
        ? dispatch(add_restaurant_to_loved(restaurantId))
        : dispatch(remove_restaurant_from_loved(restaurantId));
    }
  };

  return { getRestaurant, userLoveAction }
}