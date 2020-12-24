import { Controller, Get, Param } from '@nestjs/common';
import { MealService } from './meals.service';

@Controller('meal')
export class MealController {

  constructor(private mealService: MealService) {
  }

  @Get('getMeals/:id')
  //type for returning getMeal
  //type fot input
  getMeals(@Param('id')id): any {
    return this.mealService.getMeal(id);
  }
}