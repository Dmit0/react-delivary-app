import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealController } from './meals.controller';
import { MealService } from './meals.service';
import { Meal, MealSchema } from './models/meals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([// @ts-ignore
      { name: Meal.name, schema: MealSchema },
    ]),
  ],
  controllers: [MealController],
  providers: [MealService],
})
export class MealModule {
}