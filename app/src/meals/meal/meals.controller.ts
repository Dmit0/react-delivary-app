import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { MealService } from './meals.service';

@Controller('meal')
export class MealController {

  constructor(private mealService: MealService) {
  }

  @Get('getMeals')
  getMeals(@Query('id') id: string) {
    return this.mealService.getMealsByRestaurantId(id);
  }
}