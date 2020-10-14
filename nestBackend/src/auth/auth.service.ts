import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../participants/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  SignUp() {
    return this.userService.createUser();
  }

  SignIn() {

  }

  private createAccessToken() {
  }

  private verifyUser() {

  }
}