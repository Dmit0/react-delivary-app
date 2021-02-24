import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { IUser } from '../user/models/user.types';
import { AddressService } from './address.service';
import { IGetPaginatedAddresses, paginatedDataDto } from './models/address.types';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post('getPaginatedAddresses')
  getPaginatedAddresses(@CurrentUser() user: any, @Body('paginatedData') paginatedData: paginatedDataDto): Observable<IGetPaginatedAddresses> {
    return this.addressService.getPaginatedAddresses(user.id,user.addresses && user.addresses.length || 0, { skip: paginatedData?.offset, limit: paginatedData?.size })
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUserAddresses')
  getUserAddresses(@CurrentUser() user: any) {
    return this.addressService.getAddresses({userId: user._id})
  }
}
