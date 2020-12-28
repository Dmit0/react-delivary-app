import { country } from './index';

export interface userForCreateAccount {
  email: string
  password: string
  telephone: string
  name: string
  country: country
}

export interface loginData {
  email: string,
  password: string
}

export interface userToStore {
  token?: string,
  email: string,
  firstName: string,
  firstAddress?: string,
  userId: string,
}

export interface Address {
  addressId: string,
  country: string,
  code: string
}
