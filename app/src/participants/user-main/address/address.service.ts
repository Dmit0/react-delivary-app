import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Address } from './models/address.model';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {
  }

  generateAddress(data: any): Observable<Address>{
    const newAddress = new this.addressModel({ ...data });
    return from(newAddress.save()).pipe(
      map((address) => address || null),
    );
  }

  getAddress(data: any): Observable<Address>{
    return from(this.addressModel.findOne(data)).pipe(
      map((address) => address || null)
    )
  }

  updateAddress(criteria, data: any): Observable<any> {
    return from(this.addressModel.updateOne(criteria, data)).pipe(
      map((phone) => phone || null),
    );
  }

}
