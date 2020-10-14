import { Controller, Get, Query } from '@nestjs/common';
import { MealService } from './meals.service';

@Controller('restaurants')
export class RestaurantController {

  constructor(private restaurantService: MealService) {
  }

  @Get()
  //type for returning getMeal
  //type fot input
  getMeal(@Query('id') id): any {
    return this.restaurantService.getMeal(id);
  }
}