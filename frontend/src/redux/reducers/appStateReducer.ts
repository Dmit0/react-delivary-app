import {APP_STATES,AppActionTypes,AppState} from '../types/appTypes'

const initialState={
    loading:false,
    //bunners:[]
}

export const appStateReducer=(state=initialState,action:AppActionTypes):AppState=>{
    
    switch (action.type){
        case (APP_STATES.SHOW_LOADING):
            return {...state,loading:true}
        case (APP_STATES.HIDE_LOADING):
            return {...state,loading:false}
        // case (APP_STATES.GET_BUNNERS):
        //     return {...state,bunners:action.bunners}
        default:return state
    }
}