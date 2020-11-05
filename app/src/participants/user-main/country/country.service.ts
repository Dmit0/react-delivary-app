import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { country } from '../../../constants/initializeData/country.base';
import { Country } from './models/country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) {
  }

  private createCountry(property): Observable<any> {
    return from(this.countryModel.find()).pipe(
      mergeMap((response) => {
        if (response.length > 0) {
          return of(null);
        } else {
          const newCountry = new this.countryModel({ name:property.name, opportunities:[...property.opportunities]});
          return from(newCountry.save()).pipe(
            map((country) => country),
          );
        }
      }),
    );
  }

  generateCountry() {
    return forkJoin(country.map((item)=>this.createCountry(item))).pipe(
      map(()=>true)
    )
  }
}
