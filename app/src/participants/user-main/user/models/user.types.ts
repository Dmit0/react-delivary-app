export interface IUser {
  name: string,
  email: string,
  password: string,
  telephone: string,
  createdAt: Date,
  role: string,
  ownership?: [string],
  lovedRestaurant?: [string],
  cart?: [string],
}

export interface IUserCreate {
  email: string
  password: string
  telephone: string
  name: string
  country: {
    _id:string
    name:string
    dial_code:string
    code:string
  }
}