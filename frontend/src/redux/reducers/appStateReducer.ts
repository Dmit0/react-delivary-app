import {GET_BUNNERS,AppActionTypes,AppState} from '../types/appTypes'

const initialState:AppState={
    //loading:false,
    bunners:[]
}

export const appStateReducer=(state=initialState,action:AppActionTypes):AppState=>{
    
    switch (action.type){
        // case SHOW_LOADING:
        //     return {...state,loading:true}
        // case HIDE_LOADING:
        //     return {...state,loading:false}
        case GET_BUNNERS:
            return {...state,bunners:action.bunners}
        default:return state
    }
}