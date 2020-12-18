import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
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
  @Post('setLoved')
  setLovedUserRestaurants(@CurrentUser() user: any, @Body() restaurantId: string) {
    return this.userService.setLovedRestaurant(user._id, restaurantId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  getUser(@CurrentUser() user: any) {
    return this.userService.getUserMongoDbFields({ _id: user._id })
  }
}