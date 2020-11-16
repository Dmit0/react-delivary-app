export interface userForCreateAccont{
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

export interface loginData{
    email:string,
    password:string
}