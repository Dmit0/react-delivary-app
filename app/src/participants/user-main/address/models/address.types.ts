import {  IsOptional, IsNumber } from 'class-validator';
import { Address } from './address.model';

export interface DataToUpdateAddress {
  country?: string;
  city?: string;
  street?: string;
  streetNumber?: string;
  floor?: string;
  door?: string;
}

export class paginatedDataDto {
  @IsOptional()
  @IsNumber()
  offset?: number;
  @IsOptional()
  @IsNumber()
  size?: number;
}

export interface IGetPaginatedAddresses {
  addresses: Address[],
  total: number
}