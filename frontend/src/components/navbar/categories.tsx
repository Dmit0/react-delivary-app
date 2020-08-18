import React from 'react';
import {cuisen} from '../../interfaces/restaurant'
interface CategoriesProps{
    main_categories:string[]
    Type:string
    cuisenTypes:cuisen[]
    currentCuisen:string
    onSetType(name:string):void
    //cuisine_categories:string[]
    
}

export const Categories:React.FC<CategoriesProps>=({main_categories,Type,currentCuisen,cuisenTypes,onSetType})=>{
    return(
        <div className="App_header__secondary-action">
             <span className={Type==='All'?'navbar-brand-menu navbar-brand-menu-active':'navbar-brand-menu'} onClick={()=>onSetType('All')} >All</span>
             {main_categories.map(categorie=>
                  <span onClick={()=>onSetType(categorie)} key={categorie}  className={Type===categorie ?'navbar-brand-menu navbar-brand-menu-active' :'navbar-brand-menu'} >{categorie}</span>
             )}
             <div className="dropdown navbar-brand-menu-switcher">
                    <button className="btn btn-secondary dropdown-toggle navbar-brand-menu-switcher-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        {Type==='All' || Type==='Loved' || Type==='Opened'
                        ? "more Filters"
                        :currentCuisen
                        }                       
                    </button>
                    <ul className="dropdown-menu dropdown-menu-items" aria-labelledby="dropdownMenuButton">
                        {
                            cuisenTypes.map(cuisen=>(<li onClick={()=>onSetType(cuisen.name)} key={cuisen._id} ><span className="dropdown-item dropdown-menu-item">{cuisen.name}</span ></li >))
                        }
                    </ul>  
            </div>
        </div>
    )
}