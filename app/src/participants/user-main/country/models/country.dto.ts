import { IsString } from 'class-validator';

export class CountryDto {
  @IsString()
  _id: string;
  @IsString()
  name: string;
  @IsString()
  dial_code: string;
  @IsString()
  code: string;
}