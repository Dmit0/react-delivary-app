import {SHOW_LOADING,HIDE_LOADING,GET_BUNNERS,AppActionTypes} from '../types/appTypes'

export const show_loading=():AppActionTypes=>{ 
    return {
        type:SHOW_LOADING,

    }
}


export const hide_loading=():AppActionTypes=>{ 
    return {
        type:HIDE_LOADING,
    }
}

export const get_bunners=(bunners:string[]):AppActionTypes=>{
    return {
        type:GET_BUNNERS,
        bunners
    }
}