import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealService } from '../meal/meals.service';
import { CuisineController } from './cuisen.controller';
import { CuisineService } from './cuisen.service';
import { Selitem, CuisineSchema } from './models/cuisen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([// @ts-ignore
      { name: Selitem.name, schema: CuisineSchema },
    ]),
  ],
  controllers: [CuisineController],
  providers: [CuisineService],
})
export class CuisineModule {
}