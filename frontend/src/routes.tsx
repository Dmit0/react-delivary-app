import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {HomePage} from './pages/HomePage';
import {MealsPage} from './pages/MealsPage'


//type management = 'admin' | 'subadmin' | 'customer' // сделать запрос в индексе на роли (можно санком) положить их в редакс потом здесь получить селектором распарсить и записать в типы 

type Access= 'guest' | 'user' | 'management'

export const useRoutes=(status:Access='guest')=>{
        
    
        
        switch(status){
            case ('guest'):
                return (
                    <Switch>
                    <Route path='/HomePage' exact>
                        <HomePage/>
                    </Route>
                    <Route path ='/cart' exact>

                     </Route>
                    <Route path='/Authentication'>

                    </Route>
                    <Route path ='/MealsPage/:id'>
                        <MealsPage/>
                     </Route>
                    <Redirect to="/HomePage"/>
                    </Switch>
                )
            case('user'):
                return (
                    <Switch>
                        <Route path='/UserInfo'>

                        </Route>
                        
                        <Redirect to="/HomePage"/>
                    </Switch>
                )
                case('management'):
                    return (
                    <Switch>
                        <Route path='/AdminPanel'>

                        </Route>
                        
                        <Redirect to="/HomePage"/>
                    </Switch>
                    )                    
        }
}