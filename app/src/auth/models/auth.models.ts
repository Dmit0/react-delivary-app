export interface UserRegistrationDto {
  email: string
  password: string
  telephone: string
  name: string
}

export interface UserSignInDto {
  email: string,
  password: string
}

export interface AuthReturnData{
  token:string
}