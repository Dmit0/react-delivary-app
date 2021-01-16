import React from 'react'
import { meals } from '../../../core/types';
import { Meal } from '../components/meal';

export const rerender = {
  meals(meals: meals[], addHandler: (meal: meals) => void) {
    if (meals.length !== 0) {
      return meals.map(meal => (
        <Meal key={ meal._id } meal={ meal } onAdd={ addHandler }/>
      ));
    }
  },
};