export interface IRestaurant{
  name:string,
  working_time:string,
  description:string,
  picture:string,
  owner?:string,
  meals?:[string],
  saved?:[string],
  selItems:[string]
}