import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CuisineController } from './cuisen.controller';
import { CuisineService } from './cuisen.service';
import { Cuisine, CuisineSchema } from './models/cuisen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cuisine.name, schema: CuisineSchema },
    ]),
  ],
  controllers: [CuisineController],
  providers: [CuisineService],
})
export class CuisineModule {
}