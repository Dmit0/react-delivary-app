import { fetchGeoModel } from '../../types';
import { axiosHttp } from '../api';

export const geoApi = {
  async fetchRegions(code: any) {
      return await axiosHttp<{ data: fetchGeoModel[] }>(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions?limit=10`, 'GET', null, {
        "x-rapidapi-key": "6bf3331983msh7e9abb5bc0bbd41p19f811jsnf4f86b031d04",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      });
  },

  async fetchCities(regionCode: string, countryId: string) {
      return await axiosHttp<{ data: fetchGeoModel[] }>(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryId}/regions/${regionCode}/cities?limit=10`, 'GET', null, {
        "x-rapidapi-key": "6bf3331983msh7e9abb5bc0bbd41p19f811jsnf4f86b031d04",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      });
  },

  async fetchCountry (countryCode: string) {
      return await axiosHttp<{ data: { code: string, wikiDataId: string } }>(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}`, 'GET', null, {
        "x-rapidapi-key": "6bf3331983msh7e9abb5bc0bbd41p19f811jsnf4f86b031d04",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      });
  }
};