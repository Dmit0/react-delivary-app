import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../participants/user/user.service';
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
    return this.userService.getUser(userData.email).pipe(
      tap((user) => {
        if (user) {
          return of(false);
        }
      }),
      mergeMap(() => passwordUtils.hashPassword(userData.password).pipe(
        mergeMap((hashedPassword) => this.userService.createUser({ ...userData, password: hashedPassword }).pipe(
          map((res) => {
            if (res) {
              return of(true);
            } else {
              throw new Error('system error');
            }
          }),
        ))),
      ),
    );
  }

  //create user Type
  SignIn(userData: any): any {
    return this.createAccessToken(userData)
  }

  private async createAccessToken(data: any) {
    const token = await this.jwtService.sign({
      id: data.id,
      firstName:data.name
    });
    return token
  }

   verifyUser(verifyingData: UserSignInDto): Observable<any> {
    return this.userService.getUser({ email: verifyingData.email }).pipe(
      mergeMap((user) => passwordUtils.comparePassword(user.password, verifyingData.password).pipe(
        map((compareResult) => {
          if (compareResult) {
            return  user;
          } else {
            return of(false);
          }
        }),
      )),
    );
  }

  verifyMail(email: string) {
    return this.userService.getUser( email ).pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    )
  }

}