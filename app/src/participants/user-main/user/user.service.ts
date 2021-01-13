import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map, mergeMap, tap } from 'rxjs/operators';
import { exceptionErrors } from '../../../constants/errors/exeptionsErrors';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';
import { PhoneService } from '../phone/phone.service';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.schema';
import { from, Observable } from 'rxjs';
import { IUserCreate } from './models/user.types';
import { roles } from "../../../constants/enums/roles";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly roleService: RolesService,
    private readonly addressService: AddressService,
    private readonly phoneService: PhoneService,
    private readonly cartService: CartService,
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
                mergeMap(() => this.addressService.updateAddress({ _id: user.addresses[0]._id }, { userId: user._id }).pipe(
                  mergeMap(() => this.cartService.generateCart({ userId: user._id }).pipe(
                    mergeMap((cart) => this.updateUser({ _id: user._id }, { cart: cart._id }).pipe(
                      map((user) => user || null),
                      ),
                    ))),
                )),
              )),
            );
          }),
        )),
      )),
    );
  }

    setVerify(data: any): Observable<User> {
      const { country, region, street, streetNumber } = data
      return from(this.roleService.findRole({name: roles.VERIFIED})).pipe(
          mergeMap((role)=>this.addressService.updateAddress({_id: data.addressId},{country, region, street, streetNumber}).pipe(
              mergeMap(() => this.updateUser({ _id: data.userId }, { role: role._id }).pipe(
                  map((user) => user || null)
              ))
          ))
      )
    }

  updateUser(criteria, data: any): Observable<User> {
    return from(this.userModel.updateOne( criteria, { ...data })).pipe(
      map((user) => user || null),
    );
  }

  getLovedRestaurants(userId: any): Observable<string[]> {
    return from(this.userModel.findOne({ _id: userId })).pipe(
      map((user) => {
        return user && user.lovedRestaurant || new exceptionErrors.badRequestException('User not found')
      })
    )
  }

  setLovedRestaurant(userId: any, restaurantId: any, action: boolean): Observable<any> {
    return this.getUser({ _id: userId }).pipe(
      mergeMap((user) => this.updateUser({ _id: user._id }, {
        lovedRestaurant: action
          ? [ ...user.lovedRestaurant, restaurantId ]
          : [ ...user.lovedRestaurant.filter(item => item != restaurantId) ],
      })),
      map(() => ({ status: true })),
    );
  }

  getUserMongoDbFields(data) {
    return from(this.userModel.findOne(data)).pipe(
      mergeMap((user) => this.addressService.getAddressesByIds(user.addresses).pipe(
        mergeMap((addresses) => this.phoneService.getPhone({ userId: user._id }).pipe(
          mergeMap((phone) => this.cartService.getCart({ userId: user._id }).pipe(
            map((cart) => {
              return {
                ...user,
                addresses,
                phone,
                cart,
              };
            }),
          )),
        )),
      )),
    );
  }
}