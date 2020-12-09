import { fetchGeoModel } from '../../interfaces/geo';
import { http } from '../api';

export const geoAPI = {
  async fetchRegions(code: any) {
    try {
      return await http<{ data: fetchGeoModel[] }>(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions?limit=10`, 'GET', null, {
        "x-rapidapi-key": "6bf3331983msh7e9abb5bc0bbd41p19f811jsnf4f86b031d04",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      });
    } catch (e) {
      return false;
    }
  },

  async fetchCities(regionCode: string, countryId: string) {
    try {
      return await http<{ data: fetchGeoModel[] }>(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/%7B${countryId}%7D/regions/%7B${regionCode}%7D/cities?limit=10`, 'GET', null, {
        "x-rapidapi-key": "6bf3331983msh7e9abb5bc0bbd41p19f811jsnf4f86b031d04",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
      });
    } catch (e) {
      return false;
    }
  }
};