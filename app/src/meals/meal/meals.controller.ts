import { Controller, Get, Param } from '@nestjs/common';
import { MealService } from './meals.service';

@Controller('meal')
export class MealController {

  constructor(private mealService: MealService) {
  }

  @Get('getMeals/:id')
  getMeals(@Param('id') id: string) {
    return this.mealService.getMealsByRestaurantId(id);
  }
}