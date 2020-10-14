import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './models/meals.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name) private mealModel: Model<Meal>,
  ) {
  }

  getMeal(id) {
    return this.mealModel.findOne({ restaurant: id });
  }
}