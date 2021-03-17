import { YandexGeocodeResultType } from '../../types/yandex.types';
import { axiosHttp } from '../api';
import env from '../../../react-app-env.d'

export const YandexGeocoder = {
  async getAddressByStr(address: string, exactStreetType = true): Promise<any> {
    return await axiosHttp<YandexGeocodeResultType>(`https://geocode-maps.yandex.ru/1.x/?apikey=${env.YANDEX_API_KEY}&format=json&geocode=${exactStreetType ? '=' : ''}${address}`);
  },
};