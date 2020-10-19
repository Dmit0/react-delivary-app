import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegistrationDto, UserSignInDto } from './models/auth.models';

@Controller('authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('signIn')
  //type for returning getMeal
  //type fot input
  async signIn(@Body() userSignInDto: UserSignInDto) {
    return this.authService.SignIn(userSignInDto);
  }

  @Post('signUp')
  signUp(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.SignUp(userRegistrationDto);
  }
}