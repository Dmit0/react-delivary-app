import { axiosHttp } from '../api';

export const IpStack = {
  async getLocation(ip: string) {
    const key = 'ef57de289e35cafd79fdf383999f55e9'
    return await axiosHttp<{longitude: number, latitude: number, region_code: string, country_code: number}>(`http://api.ipstack.com/${ip}?access_key=${key}`);
  },
};