import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bunner } from './models/bunner.schema';

@Injectable()
export class BunnerService {
  constructor(
    @InjectModel(Bunner.name) private bunnerModel: Model<Bunner>,
  ) {
  }

  getBunners() {
    return this.bunnerModel.find();
  }
}