import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from './models/meals.schema';

@Injectable()
export class MealService {

  constructor(
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
  ) {
  }

  getMeal(id) {
   return from(this.mealModel.find({ restaurant: id })).pipe(
     map((meals) => meals)
   );
  }

  getMealsByIds(ids: any[]): Observable<any> {
    return from(this.mealModel.find().where('_id').in(ids)).pipe(
      map((meals) => meals || null)
    )
  }
}