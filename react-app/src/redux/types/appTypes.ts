    import {bunner} from '../../interfaces/bunner'

   export const SHOW_LOADING='SHOW_LOADING'
   export const HIDE_LOADING='HIDE_LOADING'
   export const GET_BUNNERS='GET_BUNNERS'



// interface SHOW_LOADING{
//     type:typeof SHOW_LOADING
// }

// interface HIDE_LOADING{
//     type:typeof HIDE_LOADING

// } 

interface GET_BANNERS{
    type :typeof GET_BUNNERS
    bunners:bunner[]
}


export interface AppState{
   // loading:boolean
    bunners:bunner[]
}

export type AppActionTypes=GET_BANNERS //SHOW_LOADING | HIDE_LOADING | 