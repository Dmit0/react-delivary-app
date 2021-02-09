import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PhoneDto {
  @IsString()
  phoneNumber: string
  @IsString()
  code: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  telephone: PhoneDto;
  @IsOptional()
  @IsString()
  password?: string;
}
