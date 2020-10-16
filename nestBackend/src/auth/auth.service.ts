import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
      mergeMap((user) => {
        if (user) {
          return of(false);
        }
      }),
      mergeMap(async() => {
        const hashedPassword = await passwordUtils.hashPassword(userData.password);
        return this.userService.createUser({ userData, password: hashedPassword }).pipe(
          map(() => true),
        );
      }),
    );
  }

  SignIn(userData: UserSignInDto): Observable<any> {
    return this.verifyUser(userData).pipe(
      mergeMap((verifyResult) => {
        if (verifyResult) {
          return this.createAccessToken(userData);
        }
        throw new Error('verify error');
      }),
    );
  }

  private createAccessToken(data: any) {
    return this.jwtService.sign({
      id: data.id,
    });//добавить нужные филды
  }

  private verifyUser(verifyingData: any): Observable<boolean> {
    return this.userService.getUser(verifyingData.email).pipe(
      mergeMap((user) => passwordUtils.comparePassword(user.password, verifyingData.password).pipe(
        mergeMap((compareResult) => map(() => compareResult)),
      )),
    );
  }

}