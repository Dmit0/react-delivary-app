import { country } from './index';
import { IPhone } from './phone.types';
import { IRole } from './role.types';

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
  firstAddress?: Address,
  userId: string,
  addresses?: HoleAddress[],
  phone?: IPhone,
  role?: IRole,
  createdAt?: string | null,
}

export interface UserRedux {
  userId: string | null
  userName: string | null
  email: string | null,
  firstAddress: Address | null
  addresses: HoleAddress[]
  status: string | null,
  phone: IPhone | null,
  role: IRole | null,
  createdAt: string | null
}

export interface Address {
  addressId: string,
  country: string,
  code: string
}

export interface HoleAddress {
  country: string
  countryCode: string
  region: string
  street: string
  streetNumber: string
  _id: string
}
