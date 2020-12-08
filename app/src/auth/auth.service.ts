import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { exceptionErrors } from '../constants/errors/exeptionsErrors';
import { AddressService } from '../participants/user-main/address/address.service';
import { PhoneService } from '../participants/user-main/phone/phone.service';
import { RolesService } from '../participants/user-main/roles/roles.service';
import { User } from '../participants/user-main/user/models/user.schema';
import { UserService } from '../participants/user-main/user/user.service';
import { UserRegistrationDto, UserSignInDto } from './models/auth.models';
import { passwordUtils } from './utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly phoneService: PhoneService,
    private readonly roleService: RolesService,
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
        map((role) => {
          return this.createAccessToken({ ...userData._doc, role: role.name, phone: `${ phone.code }${ phone.phoneNumber }` });
        }),
      )),
    );
  }

  private async createAccessToken(data: any) {
    const token = await this.jwtService.sign({
      id: data._id,
      telephone: data.telephone,
      email: data.email,
      firstName: data.name,
      status: data.status,
      phone: data.phone,
      role: data.role,
    });
    return { token };
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

  validateTokenPayload(payload: any): Observable<User> {
    return this.userService.getUser({ id: payload.id }).pipe(
      map((user) => user || null));
  }

  googleLogin(user: any) {
    //return this.userService.findOrCreate({ email: user-main.email })
  }
}