export interface userForCreateAccount{
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

export interface userToStore {
    token: string,
    email: string
    firstName: string
    userId: string
    phone: string
    role: string
    status: string
    firstAddress: firstCountry,
}

export interface firstCountry {
    addressId: string,
    country: string,
    code: string
}

export interface addressDataStep {
    userId: string,
    addressId: string,
    country: string,
    countryCode: string
    region: string,
    street: string,
    streetNumber: string,
}