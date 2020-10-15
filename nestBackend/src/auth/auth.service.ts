import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../participants/user/user.service';
import { UserRegistrationDto } from './models/auth.models';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  SignUp(userData: UserRegistrationDto) {
    return this.userService.getUser(userData.email).pipe(
      mergeMap((user) => {
        if (user) {
          return of(false);
        }
      }),
      mergeMap(() => {
        return this.userService.createUser(userData).pipe(
          mergeMap((user) => this.createAccessToken(user).pipe(
            map(() => true),
          )),
        );
      }),
    );
  }

  SignIn() {

  }

  private createAccessToken(data:any):Observable<any> {
    return of({})
  }

  private verifyUser(verifyingData:any):boolean {
    return true
  }
}