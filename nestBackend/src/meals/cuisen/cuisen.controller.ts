import { Controller, Get } from '@nestjs/common';
import { CuisineService } from './cuisen.service';

@Controller('cuisine')
export class RestaurantController {

  constructor(private cuisineService: CuisineService) {
  }

  @Get()
  //type for returning getMeal
  //type fot input
  getCuisines(): any {
    return this.cuisineService.getCuisines();
  }
}