import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { AddAddressDto, DeleteAddressDto } from '../address/models/address.types';
import { UpdateUserDto } from './models/user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('getLoveRestaurant')
  getLovedUserRestaurants(@CurrentUser() user: any) {
    return this.userService.getLovedRestaurants(user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('setLovedAction')
  setLovedUserRestaurants(@CurrentUser() user: any, @Body() data: { restaurantId: string, action: boolean }) {
    return this.userService.setLovedRestaurant(user._id, data.restaurantId, data.action);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  getUser(@CurrentUser() user: any) {
    return this.userService.getUserMongoDbFields({ _id: user._id });
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateUser')
  updateUser(@CurrentUser() user: any, @Body() updateUser: UpdateUserDto) {
    return this.userService.prepareToUpdateUser(user._id, updateUser)
  }

  @UseGuards(JwtAuthGuard)
  @Post('addAddress')
  AddUserAddress(@CurrentUser() user: any, @Body('address') address: AddAddressDto): any {
    return this.userService.addAddress(user._id, address);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deleteAddress')
  DeleteUserAddress(@CurrentUser() user: any, @Body('addressId') addressId: string): any {
    return this.userService.deleteAddress(user._id, addressId);
  }
}