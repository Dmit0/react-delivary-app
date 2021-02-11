import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map, mergeMap } from 'rxjs/operators';
import { exceptionErrors } from '../../../constants/errors/exeptionsErrors';
import { AddressService } from '../address/address.service';
import { AddAddressDto, UpdateAddressDto } from '../address/models/address.types';
import { CartService } from '../cart/cart.service';
import { PhoneService } from '../phone/phone.service';
import { RolesService } from '../roles/roles.service';
import { UpdateUserDto } from './models/user.dto';
import { User } from './models/user.schema';
import { forkJoin, from, Observable, of } from 'rxjs';
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

  getUserByOpportunity(property: {_id: string, opportunityId: any}): Observable<User> {
    const { _id, opportunityId } = property
    return this.getUser({ _id }).pipe(
      mergeMap(user => this.roleService.findRole({_id: user.role}).pipe(
        mergeMap(userRole => {
          if (userRole.opportunities.find(opportunity => opportunity.equals(opportunityId))) return of(user)
          return of(null)
        })
      ))
    )
  }

  createUser(user: IUserCreate): Observable<any> {
    const { email, password, name } = user;
    return forkJoin([
      this.phoneService.createPhone({
        phoneNumber: user.telephone.slice(user.country.dial_code.length),
        code: user.country.dial_code,
      }),
      this.addressService.generateAddress({ country: user.country.name }),
      this.roleService.findRole({ name: roles.BASE }),
    ]).pipe(
      mergeMap(([ phone, addresses, role ]) => {
          const newUser = new this.userModel({
            email,
            password,
            name,
            role: role._id,
            telephone: phone._id,
            addresses: [ addresses._id ]
          });
          return from(newUser.save()).pipe(
            mergeMap((user) => {
              const operations = [
                this.phoneService.updatePhone({ _id: user.telephone }, { userId: user._id }),
                this.addressService.updateAddress({ _id: user.addresses[0]._id }, { userId: user._id }),
              ];
              return forkJoin(operations).pipe(
                mergeMap(() => this.cartService.generateCart({ userId: user._id }).pipe(
                  mergeMap((cart) => this.updateUser({ _id: user._id }, { cart: cart._id }).pipe(
                    map((user) => user || null),
                  )),
                )),
              );
            }),
          );
        },
      ),
    );
  }

  setVerify(data: any): Observable<User> {
    const { country, region, street, streetNumber } = data;
    return this.roleService.findRole({ name: roles.VERIFIED }).pipe(
      mergeMap((role) => forkJoin([
        this.updateUser({ _id: data.userId }, { role: role._id }),
        this.addressService.updateAddress({ _id: data.addressId }, { country, region, street, streetNumber }),
      ]).pipe(
        map(([ user ]) => user || null),
      )),
    );
  }

  addAddress(userId: string, data: AddAddressDto): Observable<any> {
    return this.addressService.generateAddress({ ...data, userId }).pipe(
      mergeMap((address) => forkJoin([
        this.getUser({ _id: userId }),
        this.roleService.findRole({ name: roles.VERIFIED }),
      ]).pipe(
        mergeMap(([ user, verifyRole ]) => {
          if (user.role.equals(verifyRole._id)) {
            return this.updateUser({ _id: userId }, { addresses: [ ...user.addresses, address._id ] });
          }
          return forkJoin([
            this.updateUser({ _id: userId }, { role: verifyRole._id, addresses: [ address._id ] }),
            user.addresses && this.addressService.deleteAddress({ _id: user.addresses[0] }),
          ])
        }),
      )),
    );
  }

  deleteAddress(userId: string, addressId: any) {
    return this.getUser({ _id: userId }).pipe(
      mergeMap((user) => {
        if (user.addresses.length === 1) {
          return this.roleService.findRole({ name: roles.BASE }).pipe(
            mergeMap((role) => this.updateUser({ _id: userId }, { role: role._id }).pipe(
              map((user) => user || null),
            )),
          );
        }
        return of(user);
      }),
      mergeMap((user) => forkJoin([
        this.updateUser({ _id: userId }, {
          addresses: user.addresses && user.addresses.filter((address) => !address.equals(addressId)) }) || [],
        this.addressService.deleteAddress({ _id: addressId }),
      ])),
    );
  }

  updateAddress(userId: string, address: UpdateAddressDto) {
    const { addressId, ...updateData } = address;
    return this.addressService.updateAddress({ _id: addressId }, { ...updateData });
  }

  prepareToUpdateUser(userId: string, data: UpdateUserDto) {
    if (data.telephone) {
      return this.phoneService.updatePhone({ userId }, { ...data.telephone }).pipe(
        mergeMap(phone => this.updateUser({ _id: userId }, { ...data, telephone: phone._id }).pipe(
          map((user) => user && true || false),
        )),
      );
    }
    return this.updateUser({ _id: userId }, { ...data }).pipe(
      map((user) => user && true || false),
    );
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

  getUserMongoDbFields(data): Observable<any> {
    return from(this.userModel.findOne(data)).pipe(
      mergeMap((user) => {
        if (!user) {
          new exceptionErrors.badRequestException('User not found');
        }
        const operations = [
          this.addressService.getAddressesByIds(user.addresses),
          this.roleService.findRole({ _id: user.role }),
          this.phoneService.getPhone({ userId: user._id }),
          this.cartService.getCart({ userId: user._id }),
        ];
        return forkJoin(operations).pipe(
          map(([ addresses, role, phone, cart ]) => ({ addresses, role, phone, cart, user })),
        );
      })
    );
  }
}