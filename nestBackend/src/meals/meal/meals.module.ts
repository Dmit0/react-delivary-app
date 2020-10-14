import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealService } from './meals.service';
import { Meal, MealSchema } from './models/meals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Meal.name, schema: MealSchema },
    ]),
  ],
  controllers: [],
  providers: [MealService],
})
export class MealModule {
}