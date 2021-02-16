export interface IUser {
  id?: string,
  name: string,
  email: string,
  password: string,
  telephone: string,
  createdAt: Date,
  role: string,
  ownership?: string[],
  lovedRestaurant?: string[],
  cart?: string[],
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

export interface DataToUpdateUser {
  name: string,
  email: string,
  password: string,
  telephone?: {
    code: string,
    phoneNumber: string
  },
  createdAt: Date,
  role: string,
  ownership?: string[],
  lovedRestaurant?: string[],
  cart?: string[],
  address?:{
    country?: string;
    city?: string;
    street?: string;
    streetNumber?: string;
    floor?: string;
    door?: string;
  },
}
