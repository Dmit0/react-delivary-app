import React from 'react'
import { Meal as MealType } from '../../types';
import { Meal } from '../../../modules/meal/components/meal';

export const rerender = {
  meals(meals: MealType[], addHandler: (meal: MealType) => void) {
    if (meals.length !== 0) {
      return meals.map(meal => (
        <Meal key={ meal._id } meal={ meal } onAdd={ addHandler }/>
      ));
    }
  },
};