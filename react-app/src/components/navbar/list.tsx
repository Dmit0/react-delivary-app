import React from 'react'
import {Link} from 'react-router-dom'
import {restaurant} from '../../interfaces/restaurant'

interface ListProps{
    filterRestaurants:restaurant[]
    deleteFilterInput(filterText:string):void
}


export const List:React.FC<ListProps> = ({filterRestaurants,deleteFilterInput}) =>{
    
    return(
         <>
             {filterRestaurants.map(restaurant=>(
                    <Link to={`/MealsPage/${restaurant._id}`}>
                        <li onClick={()=>deleteFilterInput('')} className={'list-group-item list_item'} data-category={restaurant.name} key={restaurant._id}>
                                <span className='search_description_name'>{restaurant.name}</span>
                                <span className='search_description_content'>{restaurant.description}</span>
                        </li>
                    </Link>
                 ))}
         </>
    )
} 