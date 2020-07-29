import {combineReducers} from 'redux'
import {appStateReducer} from './appStateReducer'
import {restaurantReducer} from './restaurantReducer'


export const rootReducer = combineReducers({
    restaurant:restaurantReducer,
    app:appStateReducer
})

export type RootState = ReturnType<typeof rootReducer>