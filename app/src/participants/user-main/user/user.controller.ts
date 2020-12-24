import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { tap } from 'rxjs/operators';
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
  @Post('setLovedAction')
  setLovedUserRestaurants(@CurrentUser() user: any, @Body() data: { restaurantId: string, action: boolean }) {
    return this.userService.setLovedRestaurant(user._id, data.restaurantId, data.action);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  getUser(@CurrentUser() user: any) {
    return this.userService.getUserMongoDbFields({ _id: user._id });
  }
}