import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CuisineController } from './cuisen.controller';
import { CuisineService } from './cuisen.service';
import { Selitem, CuisineSchema } from './models/cuisen.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Selitem.name, schema: CuisineSchema },
    ]),
  ],
  controllers: [CuisineController],
  providers: [CuisineService],
})
export class CuisineModule {
}