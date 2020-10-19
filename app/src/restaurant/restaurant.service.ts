import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './models/restaurant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
  constructor(  // @ts-ignore
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {
  }

  get() {
    return this.restaurantModel.find();
  }
}