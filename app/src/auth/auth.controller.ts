import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthReturnData, UserRegistrationDto, UserSignInDto } from './models/auth.models';
import { CurrentUser } from './utils/auth.utils';

@Controller('authentication')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  signIn(@CurrentUser() user: any, @Body() userSignInDto: UserSignInDto): AuthReturnData {
    return this.authService.SignIn(user);
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