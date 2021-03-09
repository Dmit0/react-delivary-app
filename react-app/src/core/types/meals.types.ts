export type MealsResponseType = {
  meals: Meal[]
}

export interface Meal {
  picture: string,
  name: string,
  price: number,
  restaurant: string,
  _id: string,
  count: number
}

