import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {

  constructor(private restaurantService: RestaurantService) {
  }

  @Get('findAll')
  findAll(): any {
    return this.restaurantService.getAll();
  }

  @Post('findByIds')
  getRestaurantsByIds(@Body('data') data: string[]): any {
    return this.restaurantService.getRestaurantByIds(data);
  }
}