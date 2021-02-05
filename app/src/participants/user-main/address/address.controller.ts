import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { IUser } from '../user/models/user.types';
import { AddressService } from './address.service';
import { AddAddressDto, IGetPaginatedAddresses, paginatedDataDto, UpdateAddressDto } from './models/address.types';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {
  }
  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateUserAddress(@CurrentUser() user: IUser, @Body('updateAddress') updateAddress: UpdateAddressDto): any {
    return this.addressService.updateAddress(user.id,updateAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getPaginatedAddresses')
  getPaginatedAddresses(@CurrentUser() user: IUser, @Body('paginatedData') paginatedData: paginatedDataDto): Observable<IGetPaginatedAddresses> {
    return this.addressService.getPaginatedAddresses(user.id, { skip: paginatedData.offset, limit: paginatedData.size })
  }
}
