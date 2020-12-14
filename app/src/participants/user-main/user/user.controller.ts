import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guarg';
import { CurrentUser } from '../../../auth/utils/auth.utils';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('love')
  getLovedRestaurants(@CurrentUser() user: any) {
    return this.userService.getLovedRestaurants(user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('setLoved')
  setLovedRestaurants(@CurrentUser() user: any, @Body() restaurantId: string) {
    return this.userService.setLovedRestaurant(user._id, restaurantId)
  }
}