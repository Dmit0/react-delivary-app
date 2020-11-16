import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AddressService } from '../address/address.service';
import { PhoneService } from '../phone/phone.service';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.schema';
import { from, Observable, of } from 'rxjs';
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

  createUser(user: IUserCreate): Observable<User> {
    return this.roleService.findRole({ name: 'BASE' }).pipe(
      mergeMap((role) => this.phoneService.createPhone({
        code: user.country.dial_code,
        phoneNumber: user.telephone.slice(user.country.dial_code.length),
      }).pipe(
        mergeMap((phone) => this.addressService.generateAddress({ country: user.country.name }).pipe(
          mergeMap((address) => {
            const newUser = new this.userModel({ ...user, role: role._id, telephone: phone._id, addresses: [address._id] });
            return from(newUser.save()).pipe(
              map((user) => user || null),
            );
          }),
        )),
      )),
    );
  }

  updateUser() {
    return;
  }
}