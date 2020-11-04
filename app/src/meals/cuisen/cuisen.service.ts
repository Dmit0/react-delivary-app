import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { cuisines } from '../../constants/initializeData/cuisines.base';
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

  //types
 private createCuisine(property:any) {
   const newCuisine = new this.cuisineModel({ ...property});
   return from(newCuisine.save()).pipe(
     map((cuisine) => cuisine || null),
   );
  }

 async generateCuisines(){
    console.log('generate cuisine')
    await cuisines.map((item)=>this.createCuisine(item))
  }
}