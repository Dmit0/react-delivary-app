import React from 'react'
import { meals, restaurant } from '../../../core/types';
import { Restaurant } from '../components/restaurant';


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