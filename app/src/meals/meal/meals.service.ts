import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from './models/meals.schema';

@Injectable()
export class MealService {

  constructor(
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
  ) {
  }

  async getMeal(id) {
   return from(this.mealModel.find({ restaurant: id })).pipe(
     map((meals) => meals)
   );
  }
}