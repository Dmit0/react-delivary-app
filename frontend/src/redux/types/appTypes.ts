export const APP_STATES={
    SHOW_LOADING:'SHOW_LOADING',
    HIDE_LOADING:'HIDE_LOADING',
    GET_BUNNERS:'GET_BUNNERS'
}

interface SHOW_LOADING{
    type:typeof APP_STATES.SHOW_LOADING
}

interface HIDE_LOADING{
    type:typeof APP_STATES.HIDE_LOADING

} 

// interface GET_BANNERS{
//     type :typeof APP_STATES.GET_BUNNERS
//     bunners:string[]
// }

export interface AppState{
    loading:boolean
    //bunners:string[]
}

export type AppActionTypes=SHOW_LOADING | HIDE_LOADING// | GET_BANNERS