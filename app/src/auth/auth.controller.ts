import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthReturnData, UserRegistrationDto, UserSignInDto } from './models/auth.models';

@Controller('authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('signIn')
  //type for returning getMeal
  //type fot input
  signIn(@Body() userSignInDto: UserSignInDto): AuthReturnData {
    return this.authService.SignIn(userSignInDto);
  }

  @Post('signUp')
  signUp(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.SignUp(userRegistrationDto);
  }

  @Post('verifyMail')
  verifyMail(@Body() email: string) {
    return this.authService.verifyMail(email);
  }
}