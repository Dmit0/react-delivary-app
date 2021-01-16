import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './models/restaurant.schema';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  exports: [RestaurantService],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {
}