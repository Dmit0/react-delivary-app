import { useDispatch } from 'react-redux';
import { AuthenticationApi } from '../../../core/api/apis/authentication.api';
import { UserApi } from '../../../core/api/apis/user.api';
import { add_restaurant_to_loved, remove_restaurant_from_loved } from '../../../core/redux/loveRestaurants/actions';

export const useHomeUtils = () => {
  const dispatch = useDispatch()

  const getRestaurant = async (token: any) => {
    return token
      ? await AuthenticationApi.getLoveUserRestaurants(token)
      : JSON.parse(localStorage.getItem('loved') || '[]') as string[];
  };

  const userLoveAction = async (restaurantId: string, action: boolean, token: string) => {
    const response = await UserApi.loveRestaurantAction(token, { restaurantId, action });
    if (response) {
      action
        ? dispatch(add_restaurant_to_loved(restaurantId))
        : dispatch(remove_restaurant_from_loved(restaurantId));
    }
  };

  return { getRestaurant, userLoveAction }
}