import { Controller, Post, UseGuards } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { IUser } from '../user/models/user.types';
import { AddressService } from './address.service';
import { DataToUpdateAddress } from './models/address.types';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {
  }
  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateUserAddress(@CurrentUser() user: IUser,@Args('updateAddress') updateAddress:  DataToUpdateAddress): any {
    return this.addressService.updateAddress(user.id,updateAddress);
  }
}