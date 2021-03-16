export interface addressDataStep {
  userId: string,
  addressId: string,
  country: string,
  countryCode: string
  region: string,
  street: string,
  streetNumber: string,
}

export interface IAddAddress {
  country: string,
  countryCode: string,
  region: string,
  regionId: string,
  street: string,
  streetNumber: string,
}

export interface IHoleAddress {
  country: string
  countryCode: string
  region: string
  regionId: string
  street: string
  streetNumber: string
  _id: string
}

export interface IPrepareAddressForApi {
  country?: string
  region?: string
  street?: string
  streetNumber?: string
}

export interface IUpdateAddress {
  addressId: string
  country: string;
  countryCode: string;
  region: string;
  regionId: string;
  street: string;
  streetNumber: string;
}

export interface dbClickedAddress {
  country?: string;
  countryCode?: string;
  region?: string;
  street?: string;
  streetNumber?: string;
}
