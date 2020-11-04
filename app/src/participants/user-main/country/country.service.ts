import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from } from 'rxjs';
import {  map } from 'rxjs/operators';
import { country } from '../../../constants/initializeData/country.base';
import { Country } from './models/country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<Country>,
  ) {
  }

  private createCountry(property:any) {
    const newCountry = new this.countryModel({ ...property});
    return from(newCountry.save()).pipe(
      map((country) => country || null),
    );
  }

  generateCountry() {
    console.log('country')
    return country.map((item)=>this.createCountry(item))
  }
}
