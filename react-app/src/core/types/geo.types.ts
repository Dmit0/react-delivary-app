export interface fetchGeoModel {
  countryCode?: string
  fipsCode?: string
  isoCode: string
  name: string
  wikiDataId?: string
}

export interface currentIpAddress {
  ip: string,
  regionId: string,
  countryCode: number,
  country: string,
  region: string,
  street: string,
  streetNumber: string,
  lng: number,
  lat: number
}
