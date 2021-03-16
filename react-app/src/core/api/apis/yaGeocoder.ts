import { YandexGeocodeResultType } from '../../types/yandex.types';
import { axiosHttp } from '../api';

export const YandexGeocoder = {
  async getAddressByStr(address: string, exactStreetType = true): Promise<any> {
    return await axiosHttp<YandexGeocodeResultType>(`https://geocode-maps.yandex.ru/1.x/?apikey=f893ff54-4dbb-4e44-894d-a5b2dacf0caa&format=json&geocode=${exactStreetType ? '=' : ''}${address}`);
  },
};