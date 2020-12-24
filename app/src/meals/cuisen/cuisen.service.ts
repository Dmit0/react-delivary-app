import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
  private createCuisine(property): Observable<any> {
    return from(this.cuisineModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else {
          const newCuisine = new this.cuisineModel({ ...property });
          return from(newCuisine.save()).pipe(
            map((cuisine) => cuisine),
          );
        }
      }),
    );
  }

  generateCuisines(){
     return forkJoin(cuisines.map((item)=>this.createCuisine(item))).pipe(
       map(()=>true)
     )
  }
}