import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { exceptionErrors } from '../constants/errors/exeptionsErrors';
import { AddressService } from '../participants/user-main/address/address.service';
import { PhoneService } from '../participants/user-main/phone/phone.service';
import { RolesService } from '../participants/user-main/roles/roles.service';
import { User } from '../participants/user-main/user/models/user.schema';
import { UserService } from '../participants/user-main/user/user.service';
import { UserRegistrationDto, UserSignInDto, UserSignUpAddressDto } from './models/auth.models';
import { passwordUtils } from './utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly phoneService: PhoneService,
    private readonly roleService: RolesService,
    private readonly addressService: AddressService,
  ) {
  }

  SignUp(userData: UserRegistrationDto) {
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
    return this.phoneService.getPhone({ _id: userData.telephone }).pipe(
      mergeMap((phone) => this.roleService.findRole({ _id: userData.role }).pipe(
        mergeMap((role) => this.addressService.getAddressesByIds(userData.addresses).pipe(
          map((addresses) => {
            return this.createAccessToken({
              ...userData._doc,
              role: role.name,
              phone: `${ phone.code }${ phone.phoneNumber }`,
              firstAddress: { addressId: addresses[0]._id, country: addresses[0].country, code: addresses[0].countryCode },
            });
          }),
        )),
      )),
    );
  }

  private async createAccessToken(data: any) {
    const token = await this.jwtService.sign({
      id: data._id,
      email: data.email,
    });
    return {
      token,
      email: data.email,
      firstName: data.name,
      phone: data.phone,
      firstAddress: data.firstAddress,
      id: data._id,
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
      map((user) => user && true || exceptionErrors.badRequestException('bad request')),
    );
  }

  signUpStep3(data: UserSignUpAddressDto) {
    return this.userService.setVerify(data)
  }

  validateTokenPayload(payload: any): Observable<User> {
    return this.userService.getUser({ _id: payload.id }).pipe(
      tap(console.log),
      map((user) => user || null));
  }

  refreshToken(token: string): Observable<any> {
    const decodedToken = this.jwtService.decode(token);
    return of(this.generateRefreshToken(decodedToken));
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