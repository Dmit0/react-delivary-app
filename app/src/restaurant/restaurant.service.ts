import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { exceptionErrors } from '../constants/errors/exeptionsErrors';
import { Restaurant } from './models/restaurant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {
  }

  get() {
    return from(this.restaurantModel.find());
  }
}