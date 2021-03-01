import { useDispatch } from 'react-redux';
import { AuthenticationApi } from '../../../core/api/apis/authentication.api';
import { UserApi } from '../../../core/api/apis/user.api';
import { Core } from '../../../core/enums/core.enum';
import { add_restaurant_to_loved, remove_restaurant_from_loved } from '../../../core/redux/loveRestaurants/actions';
import { getLocaleStorageItem } from '../../../core/utils/locale-storage.utils';

export const useHomeUtils = () => {
  const dispatch = useDispatch()

  const getRestaurant = async (isLogin: any) => {
    return isLogin
      ? await AuthenticationApi.getLoveUserRestaurants()
      : getLocaleStorageItem(Core.Loved, '[]');
  };

  const userLoveAction = async (restaurantId: string, action: boolean) => {
    const response = await UserApi.loveRestaurantAction({ restaurantId, action });
    if (response) {
      action
        ? dispatch(add_restaurant_to_loved(restaurantId))
        : dispatch(remove_restaurant_from_loved(restaurantId));
    }
  };

  return { getRestaurant, userLoveAction }
}