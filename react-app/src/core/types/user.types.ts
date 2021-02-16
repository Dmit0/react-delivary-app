export interface IUpdateUser {
  email?: string,
  password?: string,
  phone?: {
    phoneNumber: string,
    code: string
  },
  name?: string,
}