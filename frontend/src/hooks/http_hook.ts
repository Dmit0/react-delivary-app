import {useState} from 'react'
import {restaurant} from '../interfaces/restaurant'

// interface error{
//     data:{}
//     message:string
// }

// type promise = restaurant{}[]

export const useHttp = () =>{
    const [loading,setLoading]=useState(false)
    //const [error,setError]=useState(null)


    const request = async(url:string,method='GET',body=null,headers={})=>{
        //setLoading(true)
        try{
           const response =  await fetch(url,{
                method,body,headers
            })
            const data = await response.json()

            if(!response.ok){
                throw new Error('error')//data message
            }
            
            //setLoading(false)
            return data
        
        }catch(e){
            //setLoading(false)
            //setError(e.message)
            //throw e
        }
    }
    //const clearError=()=>{setError(null)}
    
    return {request}
}