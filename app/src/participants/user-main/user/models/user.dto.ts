import { IsBoolean, IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PhoneDto } from '../../phone/models/phone.dto';

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

export class SetLovedActionDto {
  @IsString()
  restaurantId: string
  @IsBoolean()
  action: boolean
}
