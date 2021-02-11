import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Opportunities } from '../constants/enums/opportunity.enum';
import { exceptionErrors } from '../constants/errors/exeptionsErrors';
import { AddressService } from '../participants/user-main/address/address.service';
import { CartService } from '../participants/user-main/cart/cart.service';
import { OpportunitiesService } from '../participants/user-main/opportunities/opportunities.service';
import { PhoneService } from '../participants/user-main/phone/phone.service';
import { RolesService } from '../participants/user-main/roles/roles.service';
import { User } from '../participants/user-main/user/models/user.schema';
import { UserService } from '../participants/user-main/user/user.service';
import { UserCreateDto, UserSignInDto, UserSignUpAddressDto } from './models/auth.dto';
import { passwordUtils } from './utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly phoneService: PhoneService,
    private readonly roleService: RolesService,
    private readonly addressService: AddressService,
    private readonly cartService: CartService,
    private readonly opportunityService: OpportunitiesService
  ) {
  }

  private readonly buyOpportunity: Observable<any> = this.opportunityService.findOpportunity({ name: Opportunities.BUY });

  SignUp(userData: UserCreateDto) {
    return this.userService.getUser({ email: userData.email }).pipe(
      tap((user) => user && exceptionErrors.throwForbiddenError('user-main exist')),
      mergeMap(() => passwordUtils.hashPassword(userData.password).pipe(
        mergeMap((hashedPassword) => this.userService.createUser({ ...userData, password: hashedPassword }).pipe(
          map((res) => res && true || exceptionErrors.badRequestException('BadRequestException')),
        ))
        ),
      ),
    );
  }

  //create user-main Type
  SignIn(userData: any): any {
    return forkJoin([
      this.phoneService.getPhone({ _id: userData.telephone }),
      this.roleService.findRole({ _id: userData.role }),
      this.addressService.getAddressesByIds(userData.addresses),
      this.cartService.getCart({ _id: userData._doc.cart }),
    ]).pipe(
      map(([ phone, role, addresses, cart ]) => {
        return this.createAccessToken({
          ...userData._doc,
          cart: cart.countOfItems,
          role: role.name,
          phone: `${ phone.code }${ phone.phoneNumber }`,
          firstAddress: addresses.length ? { addressId: addresses[0]._id, country: addresses[0].country, code: addresses[0].countryCode } : null,
        });
      }),
    );
  }

  private async createAccessToken(data: any) {
    const token = await this.jwtService.sign({
      id: data._id,
      email: data.email,
    });
    return {
      token,
      cart: data.cart,
      email: data.email,
      firstName: data.name,
      phone: data.phone,
      firstAddress: data.firstAddress,
      id: data._id,
      loveRestaurants: data.lovedRestaurant
    };
  }

  verifyUser(verifyingData: UserSignInDto): Observable<any> {
    return this.userService.getUser({ email: verifyingData.email }).pipe(
      mergeMap((user) => passwordUtils.comparePassword(user.password, verifyingData.password).pipe(
        map((compareResult) => compareResult && user || null),
      )),
    );
  }

  verifyMail(email: string) {
    return this.userService.getUser(email).pipe(
      map((user) => user && true || false),
    );
  }

  signUpStep3(data: UserSignUpAddressDto) {
    return this.userService.setVerify(data)
  }

  validateTokenPayload(payload: any): Observable<User> {
    return this.userService.getUser({ _id: payload.id }).pipe(
      map((user) => user || null));
  }

  validateVerifiedUserTokenPayload(payload: any): Observable<User> {
    return this.buyOpportunity.pipe(
      mergeMap(buy => this.userService.getUserByOpportunity({ _id: payload.id, opportunityId: buy._id }).pipe(
        map(user => user),
      )),
    );
  }

  refreshToken(token: string) {
    const decodedToken = this.jwtService.decode(token);
    return this.generateRefreshToken(decodedToken);
  }

  private async generateRefreshToken(data: any) {
    const token = await this.jwtService.sign({
      id: data.id,
      email: data.email,
    });
    return {
      token,
      email: data.email,
      firstName: data.name,
    };
  }

  googleLogin(user: any) {
    //return this.userService.findOrCreate({ email: user-main.email })
  }
}