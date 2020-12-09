export interface UserRegistrationDto {
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

export interface UserSignUpAddressDto {
  userId: string,
  addressId: string,
  country: string,
  region: string,
  street: string,
  streetNumber: string,
}

export interface UserSignInDto {
  email: string,
  password: string
}

export interface AuthReturnData{
  token:string
}

interface Phone {
  country_code: string
  number: string
}

interface Address {
  country: string
  city: string
  street: string
  street_number: string
  floor: string
}