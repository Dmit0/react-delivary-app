import { axiosHttp } from '../api';
import env from '../../../react-app-env.d'

export const IpStack = {
  async getLocation(ip: string) {
    return await axiosHttp<{longitude: number, latitude: number, region_code: string, country_code: number}>(`http://api.ipstack.com/${ip}?access_key=${env.IP_STACK_KEY}`);
  },
};