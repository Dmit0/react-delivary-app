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
          components: GeoObjectComponent[]
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

interface GeoObjectComponent {
  kind: string,
  name: string
}