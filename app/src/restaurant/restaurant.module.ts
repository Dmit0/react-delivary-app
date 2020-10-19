import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './models/restaurant.schema';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';


@Module({
  imports: [
    MongooseModule.forFeature([// @ts-ignore
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {
}