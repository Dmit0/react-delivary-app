import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AddressService } from '../address/address.service';
import { PhoneService } from '../phone/phone.service';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.schema';
import { forkJoin, from, Observable } from 'rxjs';
import { IUserCreate } from './models/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly roleService: RolesService,
    private readonly addressService: AddressService,
    private readonly phoneService: PhoneService,
  ) {
  }

  getUser(property: any): Observable<User> {
    return from(this.userModel.findOne(property)).pipe(
      map((user) => user || null),
    );
  }

  createUser(user: IUserCreate): Observable<any> {
    const { email, password, name } = user;
    return this.phoneService.createPhone({
      phoneNumber: user.telephone.slice(user.country.dial_code.length),
      code: user.country.dial_code,
    }).pipe(
      mergeMap((phone) => this.addressService.generateAddress({ country: user.country.name }).pipe(
        mergeMap((addresses) => this.roleService.findRole({ name: 'BASE' }).pipe(
          mergeMap((role) => {
            const newUser = new this.userModel({ email, password, name, role: role._id, telephone: phone._id, addresses: [ addresses._id ] });
            return from(newUser.save()).pipe(
              mergeMap((user) => this.phoneService.updatePhone({ _id: user.telephone }, { userId: user._id }).pipe(
                mergeMap((phone) => this.addressService.updateAddress({ _id: user.addresses[0]._id }, { userId: user._id }).pipe(
                  map((user) => user || null),
                )),
              )),
            );
          }),
        )),
      )),
    );
  }

  updateUser(criteria, data: any): Observable<User> {
    return from(this.userModel.updateOne({ criteria }, { ...data })).pipe(
      map((user) => user || null),
    );
  }
}