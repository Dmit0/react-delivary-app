export interface UserRegistrationDto {
  email: string
  password: string
  telephone: string // Phone
  name: string
  //country: string
  //address: Address
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