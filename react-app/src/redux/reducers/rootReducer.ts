import {combineReducers} from 'redux'
import {appStateReducer} from './appStateReducer'
import { authReducer } from './authReducer';
import {restaurantReducer} from './restaurantReducer'
import {cartReducer} from './cartStateReducer'
import {lovedReducer} from './lovedStateReducer'
import { loadingBarReducer } from 'react-redux-loading-bar'


export const rootReducer = combineReducers({
    restaurant:restaurantReducer,
    app:appStateReducer,
    cart:cartReducer,
    loved:lovedReducer,
    loadingBar: loadingBarReducer,
    authentication:authReducer,
})

export type RootState = ReturnType<typeof rootReducer>