import { Controller, Get } from '@nestjs/common';
import { CuisineService } from './cuisen.service';

@Controller('restaurants')
export class RestaurantController {

  constructor(private cuisineService: CuisineService) {
  }

  @Get('getCuisines')
  //type for returning getMeal
  //type fot input
  getMeal(): any {
    return this.cuisineService.getCuisines();
  }
}