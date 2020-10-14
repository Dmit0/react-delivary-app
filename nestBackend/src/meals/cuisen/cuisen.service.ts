import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cuisine } from './models/cuisen.schema';


@Injectable()
export class CuisineService {
  constructor(
    @InjectModel(Cuisine.name) private cuisineModel: Model<Cuisine>,
  ) {
  }

  getCuisines() {
    return this.cuisineModel.find();
  }
}