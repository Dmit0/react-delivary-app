import {GET_BUNNERS,AppActionTypes} from '../types/appTypes'
import {ThunkAction} from 'redux-thunk'
import { RootState } from '../reducers/rootReducer'
import {AppAPI} from '../../api/appApi'
// export const show_loading=():AppActionTypes=>{ 
//     return {
//         type:SHOW_LOADING,

//     }
// }


// export const hide_loading=():AppActionTypes=>{ 
//     return {
//         type:HIDE_LOADING,
//     }
// }

export const get_bunners=():ThunkAction<Promise<void>, RootState, unknown, AppActionTypes>=>{
    return async dispatch=>{
        let bunners = await AppAPI.get()
        dispatch({
            type:GET_BUNNERS,
            bunners
        })
    }   
}