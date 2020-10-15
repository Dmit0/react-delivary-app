import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './models/auth.models';

@Controller('restaurants')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post()
  //type for returning getMeal
  //type fot input
  async login() {
    return this.authService.SignIn();
  }

  @Post()
  signUp(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.SignUp(userRegistrationDto);
  }
}