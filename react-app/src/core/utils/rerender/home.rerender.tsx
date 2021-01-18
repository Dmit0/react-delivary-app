import React from 'react'
import { restaurant } from '../../types';
import { Restaurant } from '../../../modules/home/components/restaurant';


export const rerender = {
  restaurant(
    restaurants: restaurant[],
    restaurantHandler: (restaurant: restaurant) => void,
    loveHandler: (restaurant: restaurant, value: boolean) => void,
    check: (value: string) => boolean ) {
    if (restaurants.length !== 0) return restaurants.map(item => (
      <Restaurant
        key={ item._id }
        restaurant={ item }
        onRestaurantClick={ restaurantHandler }
        toggleLoved={ loveHandler }
        checked={ check(item._id) }
      />
    ))
  }
}