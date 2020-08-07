import {combineReducers} from 'redux'
import {appStateReducer} from './appStateReducer'
import {restaurantReducer} from './restaurantReducer'
import {cartReducer} from './cartStateReducer'
import {lovedReducer} from './lovedStateReducer'


export const rootReducer = combineReducers({
    restaurant:restaurantReducer,
    app:appStateReducer,
    cart:cartReducer,
    loved:lovedReducer
})

export type RootState = ReturnType<typeof rootReducer>