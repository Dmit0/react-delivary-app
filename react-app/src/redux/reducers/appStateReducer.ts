import {GET_BUNNERS,AppActionTypes,AppState} from '../types/appTypes'

const initialState:AppState={
    bunners:[]
}

export const appStateReducer=(state=initialState,action:AppActionTypes):AppState=>{
    
    switch (action.type){
        case GET_BUNNERS:
            return {...state,bunners:action.bunners}
        default:return state
    }
}