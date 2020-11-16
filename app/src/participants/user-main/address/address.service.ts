import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Phone } from '../phone/models/phone.schema';
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

}
