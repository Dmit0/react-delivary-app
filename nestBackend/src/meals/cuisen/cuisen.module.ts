import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealService } from '../meal/meals.service';
import { Cuisine, CuisineSchema } from './models/cuisen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cuisine.name, schema: CuisineSchema },
    ]),
  ],
  controllers: [],
  providers: [MealService],
})
export class MealModule {
}