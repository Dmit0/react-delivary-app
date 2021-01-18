import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from './models/restaurant.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {
  }

  getAll() {
    return from(this.restaurantModel.find());
  }
  
  getRestaurant(property: any): Observable<Restaurant> {
    return from(this.restaurantModel.findOne(property))
  }

  getRestaurantByIds(ids: any[]): Observable<Restaurant[]> {
    return from(this.restaurantModel.find().where('_id').in(ids)).pipe(
      map((restaurants) => restaurants || null)
    )
  }
}