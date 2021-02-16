import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CountryDto } from '../../participants/user-main/country/models/country.dto';


export class UserCreateDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  telephone: string;
  @IsString()
  name: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CountryDto)
  country: CountryDto
}

export class UserSignUpAddressDto {
  @IsString()
  userId: string
  @IsString()
  addressId: string
  @IsString()
  country: string
  @IsString()
  region: string
  @IsString()
  street: string
  @IsString()
  streetNumber: string
}

export class RefreshTokenDto {
  @IsString()
  token: string
}

export class UserSignInDto {
  @IsString()
  email: string
  @IsString()
  password: string
}

export class VerifyPhoneDto {
  @IsString()
  code: string
  @IsString()
  number: string
}