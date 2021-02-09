import { combineReducers } from 'redux';
import { addressStateReducer } from './addresses/reducer';
import { appStateReducer } from './app/reducer';
import { authReducer } from './auth/reducer';
import { cartReducer } from './cart/reducer';
import { countryReducer } from './countries/reducer';
import { geoReducer } from './geo/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { lovedReducer } from './loveRestaurants/reducer';
import { popupReducer } from './popup/reducer';
import { restaurantReducer } from './restaurant/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  restaurant: restaurantReducer,
  app: appStateReducer,
  cart: cartReducer,
  loved: lovedReducer,
  loadingBar: loadingBarReducer,
  authentication: authReducer,
  countries: countryReducer,
  geo: geoReducer,
  user: userReducer,
  popup: popupReducer,
  address: addressStateReducer
});

export type RootState = ReturnType<typeof rootReducer>