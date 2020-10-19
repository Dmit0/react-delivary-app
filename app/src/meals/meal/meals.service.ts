import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './models/meals.schema';

@Injectable()
export class MealService {

  constructor(// @ts-ignore
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
  ) {
  }

  async getMeal(id) {
   return this.mealModel.find({ restaurant: id });
  }
}