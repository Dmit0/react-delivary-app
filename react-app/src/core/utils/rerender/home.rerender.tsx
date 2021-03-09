import React from 'react'
import { restaurant } from '../../types';
import { Restaurant } from '../../../modules/home/components/restaurant';


export const rerender = {
  restaurant(
    restaurants: restaurant[],
    restaurantHandler: (restaurant: restaurant) => void,
    loveHandlerAction: (restaurant: restaurant, value: boolean) => void
  ) {
    if (restaurants.length !== 0) return restaurants.map(item => (
      <Restaurant
        key={ item._id }
        restaurant={ item }
        onRestaurantClick={ restaurantHandler }
        toggleLoved={ loveHandlerAction }
        checked={item.favorite ?? false}
      />
    ))
  }
}