import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CountryService } from '../country/country.service';
import { Address } from './models/address.model';
import { IGetPaginatedAddresses } from './models/address.types';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
    private readonly countryService: CountryService,
  ) {
  }

  generateAddress(data: { country: string }): Observable<Address> {
    return from(this.countryService.findOne({ name: data.country })).pipe(
      mergeMap((country) => {
        const newAddress = new this.addressModel({ ...data, countryCode: country.code });
        return from(newAddress.save()).pipe(
          map((address) => address || null));
      }),
    );
  }

  getAddress(data: any): Observable<Address>{
    return from(this.addressModel.findOne(data)).pipe(
      map((address) => address || null)
    )
  }

  updateAddress(criteria, data: any): Observable<Address> {
    return from(this.addressModel.updateOne(criteria, data)).pipe(
      map((address) => address || null),
    );
  }

  getAddressesByIds(ids: any[]): Observable<any> {
    return from(this.addressModel.find().where('_id').in(ids)).pipe(
      map((addresses) => addresses || null)
    )
  }

  getPaginatedAddresses(userId: any, paginatedData= {
    skip: 0,
    limit: 10
  }): Observable<IGetPaginatedAddresses> {
    return from(this.addressModel.find({ userId }).limit(paginatedData.limit).skip(paginatedData.skip)).pipe(
      map((addresses) => {
        if (!addresses) return null
        return {
          addresses,
          total: addresses.length
        }
      }),
    )
  }

}
