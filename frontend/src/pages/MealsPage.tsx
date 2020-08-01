import React from 'react';
import {NavBar} from '../components/navbar/navbar'


export const MealsPage:React.FC = () => {
    return (
        <>
         <NavBar/>
         <div className="App__content">
            <div className="App__content-main">
            </div>
        </div>
        <div className="App__footer"></div>
        </>
    )
}