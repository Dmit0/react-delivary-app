import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {

  constructor(private restaurantService: RestaurantService) {
  }

  @Get('findAll')
  //type for returning findAll
  findAll(): any {
    return this.restaurantService.getAll();
  }
}