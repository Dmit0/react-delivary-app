import React from 'react';
import {useSelector} from 'react-redux'
import '../css/meals-content.css'
import {RootState} from '../redux/reducers/rootReducer'
import {NavBar} from '../components/navbar/navbar'
import {Meal} from '../components/content/meal'



export const MealsPage:React.FC = () => {

    const {meals}=useSelector((state:RootState)=>{
        return {
            meals:state.restaurant.current_meals
        }
    })

    return (
        <>
         <NavBar/>
         <div className="App__meals-container">
            <div className="App__content-main">
                {meals.map(meal=>(
                    <Meal meal={meal}/>
                ))}
            </div>
        </div>
        <div className="App__footer"></div>
        </>
    )
}