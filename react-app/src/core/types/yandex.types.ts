export interface YandexGeocodeResultType {
  GeoObjectCollection: {
    featureMember: GeoObject[],
    metaDataProperty: any
  }
}

interface GeoObject {
  GeoObject: {
    Point: {
      pos: string
    },
    description: string,
    metaDataProperty: {
      GeocoderMetaData: {
        Address: {
          country_code: string,
          formatted: string,
          Components: GeoObjectComponent[]
        },
        AddressDetails: any,
        kind: string,
        precision: string,
        text: string
      }
    }
    name: string
  }
}

export interface GeoObjectComponent {
  kind: string,
  name: string
}