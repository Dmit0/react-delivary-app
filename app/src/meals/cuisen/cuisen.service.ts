import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Selitem } from './models/cuisen.schema';


@Injectable()
export class CuisineService {
  constructor(
    @InjectModel(Selitem.name) private cuisineModel: Model<Selitem>,
  ) {
  }

  getCuisines() {
    return this.cuisineModel.find();
  }
}