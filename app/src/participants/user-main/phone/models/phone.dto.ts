import { IsString } from 'class-validator';

export class PhoneDto {
  @IsString()
  phoneNumber: string
  @IsString()
  code: string
}