import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { exceptionErrors } from '../constants/errors/exeptionsErrors';
import { UserService } from '../participants/user-main/user/user.service';
import { UserRegistrationDto, UserSignInDto } from './models/auth.models';
import { passwordUtils } from './utils/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  SignUp(userData: UserRegistrationDto) {
    return this.userService.getUser({ email: userData.email }).pipe(
      tap((user) => user && exceptionErrors.throwForbiddenError('user-main exist')),
      mergeMap(() => passwordUtils.hashPassword(userData.password).pipe(
        mergeMap((hashedPassword) => this.userService.createUser({ ...userData, password: hashedPassword }).pipe(
          map((res) => res && true || exceptionErrors.badRequestException('BadRequestException')),
        ))),
      ),
    );
  }

  //create user-main Type
  SignIn(userData: any): any {
    return this.createAccessToken(userData);
  }

  private async createAccessToken(data: any) {
    const token = await this.jwtService.sign({
      id: data._id,
      telephone: data.telephone,
      email: data.email,
      firstName: data.name,
    });
    return token;
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

  googleLogin(user: any) {
    //return this.userService.findOrCreate({ email: user-main.email })
  }
}