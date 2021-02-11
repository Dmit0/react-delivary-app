import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { cuisines } from '../../constants/initializeData/cuisines.base';
import { Cuisine } from './models/cuisen.schema';
import { ICuisine } from './models/cuisine.types';


@Injectable()
export class CuisineService {
  constructor(
    @InjectModel(Cuisine.name) private cuisineModel: Model<Cuisine>,
  ) {
  }

  getCuisines() {
    return from(this.cuisineModel.find()).pipe(
      map((cuisines) => cuisines || null)
    );
  }

  private createCuisine(property: any[]): Observable<ICuisine> {
    return from(this.cuisineModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else return this.createManyCuisines(property)
      }),
    );
  }

  private createManyCuisines(properties: any[]) {
    return from(properties).pipe(
      mergeMap((property) => {
        const newCuisine = new this.cuisineModel({ ...property });
        return from(newCuisine.save()).pipe(
          map((newCuisine) => newCuisine || null),
        );
      }),
    );
  }

  generateCuisines() {
    return this.createCuisine(cuisines).pipe(
      map(() => true),
    );
  }
}