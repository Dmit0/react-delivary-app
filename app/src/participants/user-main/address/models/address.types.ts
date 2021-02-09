import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Address } from './address.model';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  country: string;
  @IsOptional()
  @IsString()
  countryCode: string;
  @IsOptional()
  @IsString()
  region: string;
  @IsOptional()
  @IsString()
  street: string;
  @IsOptional()
  @IsString()
  streetNumber: string;
}

export class AddAddressDto {
  @IsString()
  country: string;
  @IsString()
  countryCode: string;
  @IsString()
  region: string;
  @IsString()
  street: string;
  @IsString()
  streetNumber: string;
}

export class DeleteAddressDto {
  @IsString()
  addressId: string
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