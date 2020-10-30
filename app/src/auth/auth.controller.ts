import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    console.log(user)
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@CurrentUser() user: any) {
    console.log('null')
  }
}