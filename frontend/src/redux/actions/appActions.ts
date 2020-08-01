import {APP_STATES,AppActionTypes} from '../types/appTypes'

export const show_loading=():AppActionTypes=>{ 
    return {
        type:APP_STATES.SHOW_LOADING,

    }
}


export const hide_loading=():AppActionTypes=>{ 
    return {
        type:APP_STATES.HIDE_LOADING,
    }
}

// export const get_bunners=(bunners:string[]):AppActionTypes=>{
//     return {
//         type:APP_STATES.GET_BUNNERS,
//         bunners
//     }
// }